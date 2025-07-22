// import React from 'react'
// import { useLocation } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import { useSendPageTimeMutation } from '../../../shared/api/activity_MonitoringhApi'
// const RouteTimer = () => {
//     const location = useLocation();
//     const prevPathRef = useRef(location.pathname);
//     const enterTimeRef = useRef(Date.now());
//     const [sendPageTime] = useSendPageTimeMutation();
//     const IDLE_TIMEOUT = 2 * 60 * 1000; // 3 דקות ב־ms

//     const sendTime = (path: string) => {
//         const leaveTime = Date.now();
//         const timeSpentSec = Math.floor((leaveTime - enterTimeRef.current) / 1000);
//         console.log("📤 שולחת לשרת:", path, timeSpentSec);

//         // שליחה ב-Fetch רגיל
//         sendPageTime({ metric: path, timeSpentSec });

//         // שליחה גם ב-Beacon לגיבוי
//         navigator.sendBeacon(
//             "/api/monitoring",
//             JSON.stringify({ metric: path, timeSpentSec })
//         );
//     };

//     useEffect(() => {
//         const handleBeforeUnload = () => {
//             sendTime(prevPathRef.current);
//         };

//         window.addEventListener("beforeunload", handleBeforeUnload);
//         return () => {
//             window.removeEventListener("beforeunload", handleBeforeUnload);
//         };
//     }, []);

//     useEffect(() => {
//         if (prevPathRef.current !== location.pathname) {
//             sendTime(prevPathRef.current);

//             // עדכון לזמן ולנתיב החדש
//             prevPathRef.current = location.pathname;
//             enterTimeRef.current = Date.now();
//         }
//     }, [location.pathname]);

//     return null;
// };

// export default RouteTimer;


import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSendPageTimeMutation } from '../../../shared/api/activity_MonitoringhApi';

const RouteTimer = () => {
    const location = useLocation();
    const prevPathRef = useRef(location.pathname);
    const enterTimeRef = useRef(Date.now());
    const [sendPageTime] = useSendPageTimeMutation();
    const IDLE_TIMEOUT = 2 * 60 * 1000; // 3 דקות ב־ms

    const sendTime = (path: string) => {
        const leaveTime = Date.now();
        const timeSpentSec = Math.floor((leaveTime - enterTimeRef.current) / 1000);
        console.log("📤 שולחת לשרת:", path, timeSpentSec);

        // שליחה ב-Fetch רגיל דרך RTK Query
        sendPageTime({ metric: path, timeSpentSec });

        // שליחה גם ב-Beacon לגיבוי, עם Blob ו-application/json
        const blob = new Blob(
            [JSON.stringify({ metric: path, timeSpentSec })],
            { type: "application/json" }
        );

        navigator.sendBeacon("/api/monitoring", blob);
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            sendTime(prevPathRef.current);
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (prevPathRef.current !== location.pathname) {
            sendTime(prevPathRef.current);

            // עדכון לזמן ולנתיב החדש
            prevPathRef.current = location.pathname;
            enterTimeRef.current = Date.now();
        }
    }, [location.pathname]);

    return null;
};

export default RouteTimer;


