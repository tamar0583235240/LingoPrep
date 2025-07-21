import { useParams } from "react-router-dom";
import { useGetPublicProfileQuery } from "../features/profile/services/publicProfileApi";
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaWrench,
  FaProjectDiagram,
} from "react-icons/fa";
import { IconWrapper } from "../shared/ui/IconWrapper";
import { Heading2, Paragraph } from "../shared/ui/typography";
import { Spinner } from "../shared/ui/Spinner";
import { Download, Printer } from "lucide-react";
import { Button } from "../shared/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PublicProfilePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useGetPublicProfileQuery(slug!);

  if (isLoading) return <Spinner />;
  if (isError || !data)
    return <Paragraph className="text-center mt-10 text-danger">הפרופיל לא נמצא או שגיאה בטעינה.</Paragraph>;

  const noContent =
    data.education.length === 0 &&
    data.expertise.length === 0 &&
    data.personal_projects.length === 0 &&
    data.work_experience.length === 0;

 const handleDownload = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF("p", "mm", "a4");

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${slug}_profile.pdf`);
};
  const handlePrint = async (elementId: string) => {
    window.print();
  };
  return (<>
    <div className="flex justify-end  items-center p-4 print:hidden">
      <Button
        onClick={() => handlePrint("public-profile")}
        variant="ghost"
        className="flex items-center gap-2 text-primary hover:text-primary-dark transition"
      >
        <Printer className="w-5 h-5" />
        <span className="text-sm">הדפס</span>
      </Button>
      <Button
        onClick={() => handleDownload("public-profile")}
        variant="ghost"
        className="flex items-center gap-2 text-primary hover:text-primary-dark transition"
      >
        <Download className="w-5 h-5" />
        <span className="text-sm">הורדה</span>
      </Button>
    </div>

    <div id="public-profile" className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-xl mt-6 space-y-8 print:shadow-none print:p-0">
      <div className="flex flex-col items-center text-center space-y-2">
        {data.image_url && (
          <img
            src={data.image_url}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        )}
        <Heading2 className="text-xl font-bold">{data.first_name} {data.last_name}</Heading2>

        <div className="text-sm text-muted-foreground space-y-1">
          {data.location && (
            <div className="flex justify-center items-center gap-1">
              <FaMapMarkerAlt className="text-secondary" />
              <span>{data.location}</span>
            </div>
          )}
          {data.status && <div>סטטוס: <span className="text-text">{data.status}</span></div>}
          {data.preferred_job_type && <div>סוג משרה מועדף: <span className="text-text">{data.preferred_job_type}</span></div>}
        </div>
      </div>


      {noContent && (
        <Paragraph className="text-center text-text">
          המשתמשת לא הוסיפה עדיין פרטים ציבוריים.
        </Paragraph>
      )}

      {data.education.length > 0 && (
        <Section title="השכלה" icon={<FaGraduationCap />}>
          {data.education.map((edu, i) => (
            <div key={i} className="border-b border-muted py-2 text-sm">
              <div className="font-semibold">{edu.institution_name}</div>
              <div>{edu.title} – {edu.field_of_study}</div>
              <div className="text-text">
                {new Date(edu.start_date).toLocaleDateString('he-IL', { month: 'short', year: 'numeric' })} -
                {new Date(edu.end_date).toLocaleDateString('he-IL', { month: 'short', year: 'numeric' })}
              </div>              {edu.description && <div>{edu.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {data.expertise.length > 0 && (
        <Section title="תחומי מומחיות" icon={<FaWrench />}>
          {data.expertise.map((skill, i) => (
            <div key={i} className="flex justify-between py-1 text-sm border-b border-muted">
              <span>{skill.category} – {skill.name}</span>
              <span className="text-text">{skill.level}</span>
            </div>
          ))}
        </Section>
      )}

      {data.personal_projects.length > 0 && (
        <Section title="פרויקטים" icon={<FaProjectDiagram />}>
          {data.personal_projects.map((proj, i) => (
            <div key={i} className="border-b border-muted py-2 text-sm">
              <div className="font-semibold">{proj.title}</div>
              <div>{proj.description}</div>
              {proj.demo_url && (
                <a
                  href={proj.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent text-xs underline"
                >
                  הדגמה חיה
                </a>
              )}
            </div>
          ))}
        </Section>
      )}

      {data.work_experience.length > 0 && (
        <Section title="ניסיון תעסוקתי" icon={<FaBriefcase />}>
          {data.work_experience.map((job, i) => (
            <div key={i} className="border-b border-muted py-2 text-sm">
              <div className="font-semibold">{job.company_name} – {job.position}</div>
              <div className="text-text">
                {new Date(job.start_date).toLocaleDateString('he-IL', { month: 'short', year: 'numeric' })} -
                {new Date(job.end_date).toLocaleDateString('he-IL', { month: 'short', year: 'numeric' })}
              </div>              <div>{job.description}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  </>
  );
};

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <IconWrapper size="sm" color="secondary">
        {icon}
      </IconWrapper>
      <Heading2>{title}</Heading2>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);
