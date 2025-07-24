import { CheckCircle, Check, Copy, Lightbulb, Stars } from "lucide-react";
import { useEffect, useState } from "react";
import { BiExtension } from "react-icons/bi";
import { FaDownload, FaChrome } from "react-icons/fa";
import MessageModal from "../shared/ui/messageModal";

export default function DownloadExtension() {
    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(
        () => { setTimeout(() => { setIsModalOpen(true); }, 5000); },
        []);


    const handleCopy = () => {
        navigator.clipboard.writeText("chrome://extensions");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-[--color-background] text-[--color-text]">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 border border-[--color-border] text-center">
                <div className="flex flex-col items-center gap-4">
                    <FaChrome className="text-[--color-primary] text-5xl" />
                    <h1 className="text-3xl font-[--font-hand]">התקנת התוסף שלנו לדפדפן כרום</h1>
                    <p className="text-[--color-secondary-text] text-lg">
                        בלחיצה אחת תורידי את התוסף למחשב ותוכלי להתקין אותו בקלות.
                    </p>
                    <button onClick={() => setIsModalOpen(true)} className="text-[--color-primary] hover:text-[--color-primary-dark] underline text-sm mt-2"
                    >למידע נוסף</button>
                    {isModalOpen && <MessageModal title={""} message={

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-center text-[--color-primary]"><Stars /> תוסף דפדפן – ההתקדמות שלך בלחיצת כפתור</h2>
                            <p className=" text-center"> <strong>רוצה לדעת איפה את עומדת בתהליך ההכנה לראיון?</strong><br />
                                עכשיו את לא צריכה להיכנס למערכת – פשוט לחצי על התוסף ותקבלי:</p>


                            <ul className="list-disc pr-5 space-y-1 text-right">
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> על כמה שאלות כבר ענית</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> תמונת מצב ברורה של רמת המוכנות שלך</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> תחומים שכדאי לחזור עליהם</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> טיפים ממוקדים שיקפיצו אותך קדימה</li>
                            </ul>

                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-lg flex items-center gap-2 justify-center">
                                    <strong>הכי פשוט שיש:</strong>
                                </p>
                                <ul className="list-disc pr-5 space-y-1 text-right">
                                    <li>ניגשת לדפדפן ← לחיצה אחת←  רואה בדיוק איפה את עומדת</li>
                                    <li>מחוברת? תראי את הנתונים מיד</li>
                                    <li>לא מחוברת? התחברות מהירה עם האימייל והסיסמה שלך</li>
                                </ul>
                            </div>

                            <p className="p-4 text-center text-xs text-gray-700   items-center">
                                <Lightbulb className="w-5 h-5" />
                                התוסף נועד לשימוש יומיומי קצר, קליל ויעיל – כדי שתהיי תמיד עם האצבע על הדופק.
                            </p>
                        </div>
                    }
                        onClose={() => setIsModalOpen(false)}
                    />}


                    <a
                        href="/extension.zip"
                        download
                        className="mt-4 inline-flex items-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-dark] text-white font-semibold py-3 px-6 rounded-xl transition-all"
                    >
                        <FaDownload />
                        הורדת התוסף
                    </a>
                </div>

                <hr className="my-8 border-[--color-border]" />

                <div className="text-right space-y-4">
                    <h2 className="text-xl font-bold"> איך מתקינים את התוסף?</h2>
                    <ol className="list-decimal pr-5 space-y-2 text-[--color-secondary-text]">
                        <li>לחצי על כפתור ההורדה למעלה והורידי את הקובץ למחשב.</li>
                        <li>פתחי את הקובץ (ZIP) ופרקי אותו לתיקייה כלשהי.</li>
                        <li>היכנסי לכתובת: <span className="underline text-[--color-primary]">chrome://extensions</span>    
                          <button onClick={handleCopy} title="העתק כתובת"
                            className="transition-colors text-sm p-1 rounded hover:bg-[--color-primary]/10">
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button></li>
                        <li>הפעילי את <strong>מצב פיתוח (Developer Mode)</strong> בצד שמאל למעלה.</li>
                        <li>לחצי על <strong>טעינת פריט unpacked</strong> ובחרי את התיקייה שפתחת מה-ZIP.</li>
                        <li>וזהו! התוסף יופיע בצד שמאל למעלה, ליד שורת הכתובת.<span className=" inline-block"><BiExtension size={20}/></span></li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
