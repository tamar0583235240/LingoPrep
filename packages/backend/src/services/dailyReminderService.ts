import { pool } from '../config/dbConnection';
import { ReminderType } from "../interfaces/reminderInterfaces";
import sendEmail from '../utils/sendEmail';

async function getUsersToRemind() {
    const result = await pool.query(`
    SELECT s.user_id, s.type, s.last_seen_sequence, u.email
    FROM user_reminder_settings s
    JOIN users u ON u.id = s.user_id
    WHERE s.is_enabled = true
      AND (
        s.last_sent_at IS NULL OR
        NOW() - s.last_sent_at >=
        CASE s.frequency
          WHEN 'daily' THEN interval '1 day'
          WHEN 'every_2_days' THEN interval '2 days'
          WHEN 'every_3_days' THEN interval '3 days'
          WHEN 'weekly' THEN interval '7 days'
        END
      )
  `);
    return result.rows;
}

async function getNextReminderContent(type: "tip" | "practice", lastSeq: number | null) {
    const table = type === "tip" ? "tips" : "practices";
    const result = await pool.query(`
    SELECT * FROM ${table}
    WHERE sequence_number > $1
    ORDER BY sequence_number ASC
    LIMIT 1
  `, [lastSeq ?? 0]);
    return result.rows[0] ?? null;
}

async function updateReminderSent(userId: string, type: ReminderType, sequence: number) {
    await pool.query(`
    UPDATE user_reminder_settings
    SET last_seen_sequence = $1, last_sent_at = NOW()
    WHERE user_id = $2 AND type = $3
  `, [sequence, userId, type]);
}

async function processReminders() {
    // שליחת מייל בדיקה - להסיר לאחר הבדיקה
    //     await sendEmail({
    //         // to: 't0527146247@gmail.com',
    //         // subject: 'בדיקת שליחת מייל',
    //         // html: '<p>המייל הזה נשלח לבדיקה בלבד</p>',
    await sendEmail({
        //לשים מייל שרוצה שישלח
        to: 'example@gmail.com',
        subject: '💡 טיפ מעשי!',
        html: `
  <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px; background-color: #f7f9fc; border-radius: 8px; max-width: 600px; margin: auto;">
    
    <p style="font-size: 18px; color: #333; line-height: 1.6;">
      <strong>לפני הראיון:</strong> זכרי לחייך, להתלבש בהתאם ולשמור על קשר עין.
      <br />
      טיפ קטן – השפעה גדולה!
    </p>

    <p style="font-size: 14px; color: #666; margin-top: 24px;">
      🚀 נשלח אלייך כחלק מהתזכורות החכמות של <strong>LingoPrep</strong>
    </p>
    
    <p style="font-size: 13px; color: #999; margin-top: 16px;">
      ⚙️ ניתן לבטל או לשנות את התזכורות בכל שלב דרך <strong>מסך ההגדרות</strong>
    </p>
    
  </div>
  `,
    });

    console.log("✅ מייל בדיקה נשלח");

    const users = await getUsersToRemind();

    for (const user of users) {
        const content = await getNextReminderContent(user.type, user.last_seen_sequence);
        if (!content) continue;

        // ✅ קריאה תקינה לפונקציית השליחה
        await sendEmail({
            to: user.email,
            subject: 'הנה התזכורת שלך',
            html: content.text,
        });

        await updateReminderSent(user.user_id, user.type, content.sequence_number);
    }
}

export default {
    getUsersToRemind,
    getNextReminderContent,
    updateReminderSent,
    processReminders,
};
