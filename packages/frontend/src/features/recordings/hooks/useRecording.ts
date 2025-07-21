import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  setRecordingState, 
  setShowRecordingModal, 
  resetRecording,
  addAnswer 
} from '../store/recordingSlice';
import { useUploadAnswerMutation } from '../services/recordingApi';
import { UploadAnswerDto } from '../types/UploadAnswerDto';

export const useRecording = () => {
  const dispatch = useDispatch();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef<number>(0);
  const audioBlobRef = useRef<Blob | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadAnswer] = useUploadAnswerMutation();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (mediaRecorderRef.current?.state === 'recording') {
      intervalId = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          dispatch(setRecordingState({ recordingTime: newTime }));
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [dispatch, mediaRecorderRef.current?.state]);

  const startRecording = async () => {
    try {
      if (audioBlobRef.current) {
        deleteRecording();
      }
      setAudioBlob(null);
      timeRef.current = 0;
      chunksRef.current = [];
      
      console.log('מבקש גישה למיקרופון...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false 
      });
      
      console.log('יוצר MediaRecorder...');
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setRecordingTime(0);
      dispatch(setRecordingState({ recordingTime: 0 }));

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

      // התחלת הטיימר
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      timerRef.current = setInterval(() => {
        timeRef.current += 1;
        dispatch(setRecordingState({ recordingTime: timeRef.current }));
      }, 1000);

      // התחלת ההקלטה
      mediaRecorder.start();
      dispatch(setRecordingState({ recordingTime: 0 }));
      console.log('התחלת הקלטה');
    } catch (error) {
      console.error('שגיאה בהתחלת הקלטה:', error);
    }
  };

  const stopRecording = () => {
    console.log('עוצר הקלטה...');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      dispatch(setRecordingState({ recordingTime: recordingTime }));
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume();
    }
  };

  const restartRecording = () => {
    deleteRecording();
    startRecording();
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

      // קודם מעלים את הקובץ לשרת
      const uploadFormData = new FormData();
      uploadFormData.append('file', audioBlob);

      console.log('📤 מעלה את הקובץ...');
      const uploadResponse = await fetch('http://localhost:5000/api/resources/upload', {
        method: 'POST',
        body: uploadFormData,
        headers: {
          'Accept': '*/*'
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('שגיאה בהעלאת הקובץ');
      }

      const uploadResult = await uploadResponse.json();
      console.log('✅ הקובץ הועלה בהצלחה:', uploadResult);

      // עכשיו שומרים את התשובה עם ה-URL
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

      // מעדכנים את התשובה עם הקישור לקובץ
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

      return result;

    } catch (error) {
      console.error('שגיאה בתהליך השמירה:', error);
      throw error;
    }
  };

  const deleteRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timeRef.current = 0;
    chunksRef.current = [];
    audioBlobRef.current = null;
    setAudioBlob(null);
    dispatch(setRecordingState({ recordingTime: 0 }));
  };

  return {
    currentRecording: {
      recordingTime: timeRef.current,
    },
    isLoading: false,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    restartRecording,
    deleteRecording,
    saveRecording,
    audioBlobRef,
    audioBlob
  };
};