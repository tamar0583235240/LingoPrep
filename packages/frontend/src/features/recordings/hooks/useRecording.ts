import { useRef, useEffect, useState } from 'react';
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
import { UploadAnswerDto } from '../types/UploadAnswerDto';
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
        audioBlobRef.current = blob;
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
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
  const stopRecording = () => {
    if (mediaRecorderRef.current && (currentRecording.isRecording || currentRecording.isPaused)) {
      mediaRecorderRef.current.stop();
      dispatch(setRecordingState({
        isRecording: false,
        isPaused: false
      }));
      dispatch(setShowRecordingModal(false));
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
      // audioBlobRef.current = null; // איפוס ה-Blob אחרי שמירה
      // setAudioBlob(null); // איפוס גם ב-state
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
  };
};






