import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSendPageTimeMutation } from '../api/activityMonitoringApi';
// import { useSendPageTimeMutation } from '../../../shared/api/activityMonitoringhApi';

const RouteTimer: React.FC = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const enterTimeRef = useRef(Date.now());
  const [sendPageTime] = useSendPageTimeMutation();

  const sendTime = (path: string) => {
    const leaveTime = Date.now();
    const timeSpentSec = Math.floor((leaveTime - enterTimeRef.current) / 1000);
    sendPageTime({ metric: path, timeSpentSec });

    navigator.sendBeacon(
      '/api/monitoring',
      JSON.stringify({ metric: path, timeSpentSec })
    );
  };
  useEffect(() => {
    const handleBeforeUnload = () => {
      sendTime(prevPathRef.current);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      sendTime(prevPathRef.current);
      prevPathRef.current = location.pathname;
      enterTimeRef.current = Date.now();
    }
  }, [location.pathname]);
  return null; 
};

export default RouteTimer;