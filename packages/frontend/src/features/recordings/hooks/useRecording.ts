import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../shared/store/store';
import { 
  setRecordingState, 
  setShowRecordingModal, 
  resetRecording,
  addAnswer 
} from '../store/recordingSlice';
import type { Answer } from '../types/Answer';
import { useUploadAnswerMutation } from '../services/recordingApi';
import { useUploadRecordingMutation } from '../services/resourceApi';
import { UploadAnswerDto } from '../types/UploadAnswerDto';
import { useAnswerUpload } from './useAnswerUpload';

export const useRecording = () => {
  const dispatch = useDispatch();
  const { currentRecording, showRecordingModal } = useSelector(
    (state: RootState) => state.recording);
  const [uploadAnswer, { isLoading }] = useUploadAnswerMutation();
  const [uploadRecording] = useUploadRecordingMutation();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioBlobRef = useRef<Blob | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  // טיימר להקלטה
  useEffect(() => {
    if (currentRecording.isRecording && !currentRecording.isPaused) {
      timerRef.current = setInterval(() => {
        dispatch(setRecordingState({
          recordingTime: currentRecording.recordingTime + 1
        }));
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentRecording.isRecording, currentRecording.isPaused, currentRecording.recordingTime, dispatch]);

  const { uploadAndAnalyze } = useAnswerUpload();

  const stopRecording = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      dispatch(setRecordingState({ isRecording: false }));
      
      // המתנה ליצירת ה-Blob
      await new Promise<void>((resolve) => {
        mediaRecorderRef.current!.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
          audioBlobRef.current = blob;
          setAudioBlob(blob);
          resolve();
        };
      });

      // שליחה לשרת וניתוח
      try {
        const { answer, analysis } = await uploadAndAnalyze(
          currentRecording.questionId,
          currentRecording.userId,
          audioBlobRef.current!,
          `recording_${Date.now()}.wav`
        );

        // המרה למבנה Answer
        const formattedAnswer: Answer = {
          id: answer.id || '',
          user_id: currentRecording.userId,
          question_id: currentRecording.questionId,
          file_url: answer.fileUrl,
          answer_file_name: answer.fileUrl.split('/').pop() || 'unknown.wav',
          submitted_at: new Date(),
          amount_feedbacks: 0
        };

        // עדכון ה-Redux store
        dispatch(addAnswer(formattedAnswer));
        
        // הצגת התוצאות
        dispatch(setShowRecordingModal(false));
        dispatch(resetRecording());
      } catch (error) {
        console.error('שגיאה בהעלאת או ניתוח ההקלטה:', error);
      }
    }
  };

  const startRecording = async () => {
    try {
      if (audioBlobRef.current) {
        deleteRecording();
      }
      setAudioBlob(null);
      setRecordingTime(0);
      chunksRef.current = [];
      
      console.log('מבקש גישה למיקרופון...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false 
      });
      
      console.log('יוצר MediaRecorder...');
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      dispatch(setRecordingState({ 
        recordingTime: 0,
        isRecording: true,
        isPaused: false 
      }));
      dispatch(setShowRecordingModal(true));

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('קיבלנו נתוני אודיו:', event.data.size, 'bytes');
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('ההקלטה נעצרה, מאחד chunks...');
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        console.log('Blob נוצר:', blob.size, 'bytes');
        audioBlobRef.current = blob;
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      // התחלת ההקלטה
      mediaRecorder.start();
      console.log('התחלת הקלטה');
    } catch (error) {
      console.error('שגיאה בהתחלת הקלטה:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && (currentRecording.isRecording || currentRecording.isPaused)) {
      mediaRecorderRef.current.stop();
      dispatch(setRecordingState({
        isRecording: false,
        isPaused: false
      }));
      dispatch(setShowRecordingModal(false));
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && currentRecording.isRecording) {
      mediaRecorderRef.current.pause();
      dispatch(setRecordingState({
        isPaused: true,
        isRecording: false
      }));
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && currentRecording.isPaused) {
      mediaRecorderRef.current.resume();
      dispatch(setRecordingState({
        isPaused: false,
        isRecording: true
      }));
    }
  };

  const deleteRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }

    mediaRecorderRef.current = null;
    chunksRef.current = [];
    audioBlobRef.current = null;
    setAudioBlob(null); // איפוס גם ב-state

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    dispatch(resetRecording());
  };

  const restartRecording = async () => {
    deleteRecording();
    await startRecording();
  };

  const saveRecording = async (questionId: string, userId: string, answerFileName: string, amountFeedbacks: number = 0) => {
    if (!audioBlobRef.current || !chunksRef.current.length) {
      console.error('אין הקלטה לשמירה');
      throw new Error('אין הקלטה לשמירה');
    }

    // בדיקת תקינות הפרמטרים
    if (!questionId || !userId || !answerFileName) {
      console.error('חסרים פרמטרים חובה', { questionId, userId, answerFileName });
      throw new Error('חסרים פרטים נדרשים');
    }

    try {
      console.log('📤 מתחיל תהליך שמירה...');

      // יצירת blob מהנתונים
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
      
      // הוספת סיומת wav אם לא קיימת
      const finalFileName = answerFileName.trim().endsWith('.wav') 
        ? answerFileName.trim() 
        : `${answerFileName.trim()}.wav`;

      // קודם מעלים את הקובץ לשרת עם הפרטים המלאים
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('title', finalFileName);
      formData.append('description', '');
      formData.append('file', audioBlob, finalFileName);

      console.log('📤 מעלה את הקובץ...');
      const uploadResult = await uploadRecording(formData).unwrap();
      console.log('✅ הקובץ הועלה בהצלחה:', uploadResult);

      // שומרים את התשובה עם ה-URL
      const answerData: UploadAnswerDto = {
        userId,
        questionId,
        fileUrl: uploadResult.url,
        amountFeedbacks,
        answerFileName: finalFileName
      };

      console.log('💾 שומר את התשובה...', answerData);
      const result = await uploadAnswer(answerData).unwrap();
      console.log('✅ התשובה נשמרה בהצלחה:', result);

      // שולחים לניתוח AI
      const aiFormData = new FormData();
      aiFormData.append('audioUrl', uploadResult.url);
      aiFormData.append('answerId', result.id.toString());

      const aiResponse = await fetch('http://localhost:5000/api/ai-insights/analyze', {
        method: 'POST',
        body: aiFormData,
        headers: {
          'Accept': '*/*'
        }
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('שגיאה בשרת:', errorText);
        throw new Error('שגיאה בניתוח AI');
      }

      const aiResult = await aiResponse.json();
      console.log('✨ תוצאות ניתוח AI:', aiResult);

      // מעדכנים את התשובה אם יש URL חדש מה-AI
      if (aiResult.fileUrl) {
        const updatedAnswerData = {
          ...answerData,
          fileUrl: aiResult.fileUrl
        };
        await uploadAnswer(updatedAnswerData).unwrap();
      }

      dispatch(addAnswer(result));
      dispatch(resetRecording());

      if (result?.id) {
        dispatch({ type: 'simulation/setCurrentAnswerId', payload: result.id });
      }

      // איפוס הבלובים
      audioBlobRef.current = null;
      setAudioBlob(null);

      return result;

    } catch (error) {
      console.error('שגיאה בתהליך השמירה:', error);
      throw error;
    }
  };

  return {
    currentRecording,
    showRecordingModal,
    isLoading,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording,
    restartRecording,
    saveRecording,
    audioBlobRef,
    audioBlob
  };
};