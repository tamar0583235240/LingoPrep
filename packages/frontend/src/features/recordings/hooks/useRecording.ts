import { useRef, useEffect, useState } from 'react';
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
import { 
  setRecordingState, 
  setShowRecordingModal, 
  resetRecording,
  addAnswer 
} from '../store/recordingSlice';
import { useUploadAnswerMutation } from '../services/recordingApi';
=======
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../shared/store/store';
import {
  setRecordingState,
  setShowRecordingModal,
  resetRecording,
  addAnswer
} from '../store/recordingSlice';
import { useUploadAnswerMutation } from '../services/recordingApi';
import { useUploadRecordingMutation } from '../services/resourceApi';
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
import { UploadAnswerDto } from '../types/UploadAnswerDto';

export const useRecording = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD
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
=======
  const { currentRecording, showRecordingModal } = useSelector(
    (state: RootState) => state.recording);
  const [uploadAnswer, { isLoading }] = useUploadAnswerMutation();
  const [uploadRecording] = useUploadRecordingMutation();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioBlobRef = useRef<Blob | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  // טיימר להקלטה

  useEffect(() => {
    if (currentRecording.isRecording && !currentRecording.isPaused) {
      timerRef.current = setInterval(() => {
        dispatch(setRecordingState({
          recordingTime: currentRecording.recordingTime + 1
        }));
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

  const startRecording = async () => {
    if (audioBlobRef.current) {
      deleteRecording();
    }
    setAudioBlob(null); // איפוס גם ב-state

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
        audioBlobRef.current = blob;
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

<<<<<<< HEAD
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
=======
      mediaRecorder.start();
      dispatch(setRecordingState({
        isRecording: true,
        isPaused: false,
        recordingTime: 0
      }));
      dispatch(setShowRecordingModal(true));
    } catch (error) {
      console.error('שגיאה בהתחלת הקלטה:', error);
      alert('לא ניתן לגשת למיקרופון');
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    }
  };

  const pauseRecording = () => {
<<<<<<< HEAD
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
=======
    if (mediaRecorderRef.current && currentRecording.isRecording) {
      mediaRecorderRef.current.pause();
      dispatch(setRecordingState({
        isPaused: true,
        isRecording: false
      }));
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    }
  };

  const resumeRecording = () => {
<<<<<<< HEAD
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
=======
    if (mediaRecorderRef.current && currentRecording.isPaused) {
      mediaRecorderRef.current.resume();
      dispatch(setRecordingState({
        isPaused: false,
        isRecording: true
      }));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (currentRecording.isRecording || currentRecording.isPaused)) {
      mediaRecorderRef.current.stop();
      dispatch(setRecordingState({
        isRecording: false,
        isPaused: false
      }));
      dispatch(setShowRecordingModal(false));
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    }
  };

  const deleteRecording = () => {
<<<<<<< HEAD
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
=======
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

  const saveRecording = async (
    userId: string,
    questionId: string,
    answerFileName: string,
    amountFeedbacks: number = 0
  ) => {
    if (!audioBlobRef.current || !answerFileName.trim()) {
      alert('אנא הזן שם לקובץ');
      return;
    }

    const fileNameWithExtension = answerFileName.endsWith('.wav') ? answerFileName : `${answerFileName}.wav`;

    //  העלאת הקלטה לשרת
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', fileNameWithExtension);
    formData.append('description', '');
    formData.append('file', audioBlobRef.current, fileNameWithExtension);
    let fileUrl = '';
    try {
      const uploadRes = await uploadRecording(formData).unwrap();
      fileUrl = uploadRes.url;
    } catch (e) {
      console.error('שגיאה בהעלאת הקלטה לשרת');
      return;
    }

    //  שליחת תשובה עם ה-URL
    const answerData: UploadAnswerDto = {
      userId: userId,
      questionId: questionId,
      fileUrl: fileUrl, // ה-URL מהענן
      amountFeedbacks: amountFeedbacks,
      answerFileName: fileNameWithExtension,
    };

    try {
      const result = await uploadAnswer(answerData as any).unwrap();
      dispatch(addAnswer(result));
      dispatch(resetRecording());
      console.log(result);
      if (result?.id) {
        dispatch({ type: 'simulation/setCurrentAnswerId', payload: result.id });
      }
      audioBlobRef.current = null; // איפוס ה-Blob אחרי שמירה
      setAudioBlob(null); // איפוס גם ב-state
      return result;
    } catch (error) {
      console.error('שגיאה בשמירת ההקלטה:', error);
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
    audioBlob,
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  };
};