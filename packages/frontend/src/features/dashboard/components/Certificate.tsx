import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer } from "lucide-react";
import { Button } from "../../../shared/ui/button";

interface CertificateProps {
  fullName: string;
}

export const Certificate: React.FC<CertificateProps> = ({ fullName }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("certificate.pdf");
  };

  const handlePrint = () => {
    if (!certificateRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head><title>הדפסת תעודה</title></head>
        <body dir="rtl" onload="window.print(); window.close();">
          ${certificateRef.current.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div
      ref={certificateRef}
      className="relative max-w-3xl mx-auto py-12 px-10 rounded-[28px] border border-[--color-primary]/30 bg-[--color-background] text-center space-y-5 shadow-2xl cursor-default"
    >
      {/* כפתורים בצד שמאל למעלה */}
      <div
        className="absolute top-4 left-4 flex gap-2"
        onClick={(e) => e.stopPropagation()} // מונע סגירה מהכפתורים
      >
        <Button
          icon={<Download size={16} />}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
        />
        <Button
          icon={<Printer size={16} />}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handlePrint();
          }}
        />
      </div>

      {/* כותרת */}
      <h1 className="text-3xl font-bold text-[--color-primary-dark] mb-1">
        תעודת מוכנות לראיון
      </h1>
      <p className="text-base text-[--color-secondary-text]">מוענקת ל־</p>
      <h2 className="text-2xl font-semibold text-[--color-primary]">{fullName}</h2>

      {/* תיאור */}
      <p className="text-[--color-text] text-sm leading-relaxed max-w-prose mx-auto">
        על הישגים יוצאי דופן, התמדה וחתירה למצוינות. אנו מוקירים את הדרך שעשית, מעריכים את תרומתך ומברכים אותך להמשך הצלחה.
      </p>

      {/* חתימה ותאריך */}
      <div className="mt-6 flex justify-between text-sm text-[--color-secondary-text] px-6">
        <span>{new Date().toLocaleDateString("he-IL")}</span>
      </div>
    </div>
  );
};
