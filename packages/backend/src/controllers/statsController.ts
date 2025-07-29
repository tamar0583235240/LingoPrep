// // // import { Request, Response } from 'express';
// // // import sessionRepository from '../reposioty/sessionRepository';

// // // export const getWeeklyUserStats = async (req: Request, res: Response) => {
// // //   try {
// // //     const stats = await sessionRepository.getWeeklyStats();
// // //     res.json({
// // //       activeUsers: stats.active_users || 0,
// // //     //   avgTimeMinutes: stats.avg_minutes || 0,
// // //       avgTimeMinutes: Number(stats.avg_minutes) || 0, // חובה להמיר למספר

// // //     });
// // //   } catch (e) {
// // //     console.error('שגיאה בקבלת נתוני סטטיסטיקה:', e);
// // //     res.status(500).json({ message: 'שגיאה בקבלת נתוני סטטיסטיקה' });
// // //   }
// // // };

// // // בקובץ statsController.ts
// // import { Request, Response } from 'express';
// // import sessionRepository from '../reposioty/sessionRepository';

// // export const getWeeklyUserStats = async (req: Request, res: Response) => {
// //   try {
// //     console.log("📊 בקשת סטטיסטיקות שבועיות...");
    
// //     // בדיקת debug
// //     const debugStats = await sessionRepository.getSessionsDebug();
// //     console.log("🔍 Debug info:", debugStats);
    
// //     const stats = await sessionRepository.getWeeklyStats();
// //     console.log("📈 סטטיסטיקות שבועיות:", stats);
    
// //     res.json({
// //       activeUsers: stats.active_users || 0,
// //       avgTimeMinutes: Number(stats.avg_minutes) || 0,
// //       debug: debugStats // זמני לבדיקה
// //     });
// //   } catch (e) {
// //     console.error('שגיאה בקבלת נתוני סטטיסטיקה:', e);
// //     res.status(500).json({ message: 'שגיאה בקבלת נתוני סטטיסטיקה' });
// //   }
// // };


// // import { Request, Response } from 'express';
// // import sessionRepository from '../reposioty/sessionRepository';

// // export const getWeeklyUserStats = async (req: Request, res: Response) => {
// //   try {
// //     const stats = await sessionRepository.getWeeklyStats();
// //     res.json({
// //       activeUsers: stats.active_users || 0,
// //     //   avgTimeMinutes: stats.avg_minutes || 0,
// //       avgTimeMinutes: Number(stats.avg_minutes) || 0, // חובה להמיר למספר

// //     });
// //   } catch (e) {
// //     console.error('שגיאה בקבלת נתוני סטטיסטיקה:', e);
// //     res.status(500).json({ message: 'שגיאה בקבלת נתוני סטטיסטיקה' });
// //   }
// // };

// // בקובץ statsController.ts
// import { Request, Response } from 'express';
// import sessionRepository from '../reposioty/sessionRepository';

// export const getWeeklyUserStats = async (req: Request, res: Response) => {
//   try {
//     console.log("📊 בקשת סטטיסטיקות שבועיות...");
    
//     // בדיקת debug
//     const debugStats = await sessionRepository.getSessionsDebug();
//     console.log("🔍 Debug info:", debugStats);
    
//     const stats = await sessionRepository.getWeeklyStats();
//     console.log("📈 סטטיסטיקות שבועיות:", stats);
    
//     res.json({
//       activeUsers: stats.active_users || 0,
//       avgTimeMinutes: Number(stats.avg_minutes) || 0,
//       debug: debugStats // זמני לבדיקה
//     });
//   } catch (e) {
//     console.error('שגיאה בקבלת נתוני סטטיסטיקה:', e);
//     res.status(500).json({ message: 'שגיאה בקבלת נתוני סטטיסטיקה' });
//   }
// };




// 📊 statsController.ts – כולל סטטיסטיקות שבועיות + יומיות
import { Request, Response } from 'express';
import sessionRepository from '../reposioty/sessionRepository';

export const getUserStats = async (req: Request, res: Response) => {
  try {
    console.log("📊 בקשת סטטיסטיקות שבועיות + יומיות...");

    // סטטיסטיקות שבועיות
    const weeklyStats = await sessionRepository.getWeeklyStats();
    console.log("📈 סטטיסטיקות שבועיות:", weeklyStats);

    // סטטיסטיקות יומיות
    const dailyStats = await sessionRepository.getDailyStats();
    console.log("📅 סטטיסטיקות יומיות:", dailyStats);

    res.json({
      weekly: {
        activeUsers: weeklyStats.active_users || 0,
        avgTimeMinutes: Number(weeklyStats.avg_minutes) || 0,
      },
      daily: {
        activeUsers: dailyStats.active_users || 0,
        avgTimeMinutes: Number(dailyStats.avg_minutes) || 0,
      }
    });
  } catch (e) {
    console.error('❌ שגיאה בקבלת נתוני סטטיסטיקה:', e);
    res.status(500).json({ message: 'שגיאה בקבלת נתוני סטטיסטיקה' });
  }
};