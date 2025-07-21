// בס"ד

import { data } from "react-router-dom";
import { useGetAllInterviewExperiencesQuery } from "../services/interviewExperiencesApi";
import { useGetAllExperienceThanksQuery } from '../services/experienceThanksApi';
import { useGetUsersQuery } from '../../../shared/api/userApi'
import { experienceThanks } from "../types/experienceThanks";
import { InterviewExperienceView } from "./interviewExperienceView";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { Card, CardSimple } from "../../../shared/ui/card";
import { Spinner } from "../../../shared/ui/Spinner";
import { EmptyState } from "../../../shared/ui/EmptyState";
import { Heading1, Paragraph } from "../../../shared/ui/typography";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { FaHeart, FaCalendarAlt, FaEye, FaBriefcase } from "react-icons/fa";
import React, { useState } from "react";
// import { FaBriefcase, FaCalendarAlt, FaHeart } from "react-icons/fa";
// import * as FaIcons from "react-icons/fa";

export const InterviewExperiencesList = () => {
  // const { data: interviewExperiences, isLoading, isError } = useGetAllInterviewExperiencesQuery();
  // const { data: experienceThanks, isLoading: thanksLoading, isError: thanksError } = useGetAllExperienceThanksQuery();
  // const { data: users, isLoading: usersLoading, isError: usersError } = useGetUsersQuery();

  // 
  // נתוני דמה של משתמשים
  const users = [
    {
      id: 'user-1',
      first_name: 'תמר',
      last_name: 'גרינבוים',
      email: 'tamar@example.com',
      phone: '0501234567',
      role: 'student',
      createdAt: new Date().toISOString(),
      isActive: true,
    },
    {
      id: 'user-2',
      first_name: 'נועה',
      last_name: 'כהן',
      email: 'noa@example.com',
      phone: '0509876543',
      role: 'manager',
      createdAt: new Date().toISOString(),
      isActive: true,
    },
  ];
  // נתוני דמה של חוויות ריאיון
  const interviewExperiences = [
    {
      id: 'exp-1',
      company_name: 'Google',
      position: 'Frontend Developer',
      interviewDate: '2025-06-15',
      questions: 'שאלו על JavaScript ו-React',
      tips: 'לתרגל הרבה לפני',
      description: 'היה ראיון נעים ומקצועי מאוד',
      hired: true,
      rating: 4,
      anonymous: false,
      created_at: new Date(),
      user_id: 'user-1',
    },
    {
      id: 'exp-2',
      company_name: 'Microsoft',
      position: 'Backend Developer',
      interviewDate: '2025-06-10',
      questions: 'SQL, Node.js ופתרון בעיות',
      tips: 'להבין לעומק את מבני הנתונים',
      description: 'ראיון אינטנסיבי אך הוגן',
      hired: false,
      rating: 3,
      anonymous: true,
      created_at: new Date(),
      user_id: 'user-2',
    },
  ];
  // נתוני דמה של תודות לחוויות
  const experienceThanks = [
    {
      id: 'thanks-1',
      created_at: new Date(),
      experience_id: 'exp-1',
      user_id: 'user-2',
    },
    {
      id: 'thanks-2',
      created_at: new Date(),
      experience_id: 'exp-2',
      user_id: 'user-1',
    },
  ];
  // נתוני דמה
  const [experiences] = useState([
    {
      id: "1",
      company_name: "Google",
      position: "Frontend Developer",
      rating: 4,
      description: "ראיון מאוד מקצועי עם שאלות טכניות",
      created_at: "2024-06-15",
      anonymous: false,
      thanks: 3
    },
    {
      id: "2",
      company_name: "Meta",
      position: "Backend Developer",
      rating: 5,
      description: "הראיון זרם מעולה עם ראיון HR מעניין",
      created_at: "2024-07-01",
      anonymous: true,
      thanks: 7
    },
    {
      id: "3",
      company_name: "Microsoft",
      position: "QA Engineer",
      rating: 3,
      description: "שאלו אותי הרבה על בדיקות אוטומטיות",
      created_at: "2024-06-20",
      anonymous: false,
      thanks: 2
    },
  ]);
  // const interviewExperiences = mockInterviewExperiences;
  // const experienceThanks = mockExperienceThanks;
  // const users = mockUsers;

  // // 
  // // ✅ משתני סינון
  // const [companyFilter, setCompanyFilter] = useState("");
  // const [positionFilter, setPositionFilter] = useState("");
  // const [minThanksFilter, setMinThanksFilter] = useState(0);
  const [searchCompany, setSearchCompany] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [minThanks, setMinThanks] = useState(0);
  const [filterDate, setFilterDate] = useState("");
  const [sortOption, setSortOption] = useState(""); // חדש: מיון

  // ✅ חישוב החוויות המסוננות
  // const filteredExperiences = interviewExperiences?.filter((exp) => {
  //   const companyMatch = exp.company_name?.toLowerCase().includes(companyFilter.toLowerCase());
  //   const positionMatch = exp.position?.toLowerCase().includes(positionFilter.toLowerCase());
  //   const thanksMatch = getThunksByInterviewExperienceId(exp.id).length >= minThanksFilter;
  //   return companyMatch && positionMatch && thanksMatch;
  // });
  const filteredExperiences = experiences
    .filter((exp) => {
      return (
        exp.company_name.toLowerCase().includes(searchCompany.toLowerCase()) &&
        (filterPosition === "" || exp.position === filterPosition) &&
        exp.thanks >= minThanks &&
        (filterDate === "" || exp.created_at >= filterDate)
      );
    })
    .sort((a, b) => {
      if (sortOption === "thanks") {
        return b.thanks - a.thanks; // מהכי הרבה תודות
      } else if (sortOption === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // מהכי חדשות
      }
      return 0;
    });

  function getThunksByInterviewExperienceId(interviewExperienceId: string): experienceThanks[] {
    return (experienceThanks ? experienceThanks.filter(thanks => thanks.experience_id === interviewExperienceId) : []);
  }

  // if (isLoading) {
  //   return (
  //     <GridContainer maxWidth="lg" className="flex justify-center items-center min-h-[400px]">
  //       <Spinner />
  //     </GridContainer>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <GridContainer maxWidth="lg">
  //       <EmptyState
  //         icon={<FaBriefcase />}
  //         title="אירעה שגיאה"
  //         description="לא הצלחנו לטעון את חוויות הראיונות. אנא נסה שוב מאוחר יותר."
  //         iconColor="danger"
  //       />
  //     </GridContainer>
  //   );
  // }

  if (!interviewExperiences || interviewExperiences.length === 0) {
    return (
      <GridContainer maxWidth="lg">
        <EmptyState
          icon={<FaBriefcase />}
          title="אין חוויות ראיונות עדיין"
          description="היי הראשונה לשתף את החוויה שלך מראיון עבודה ולעזור לאחרות!"
          buttonText="שתף חוויה"
          iconColor="primary-dark"
        />
      </GridContainer>
    );
  }

  return (
    <GridContainer maxWidth="xl" className="space-y-8">
      {/* כותרת ראשית */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[--color-primary] to-[--color-primary-dark] bg-clip-text text-transparent">
          שיתוף חוויות מראיונות עבודה שלכן
        </h1>
        <Paragraph className="text-lg max-w-2xl mx-auto">
          למדו מחוויות של נשים אחרות וקבלו השראה להצלחה בראיונות העבודה שלכן
        </Paragraph>
      </div>


      {/* שדות סינון + מיון */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GridContainer maxWidth="md" className="text-center">
          <CardSimple className="p-8">
            <input
              type="text"
              placeholder="חפש כאן"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              className="border p-2 rounded w-full"
            />
            {/* תוצאות */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border p-4 rounded shadow-sm bg-white"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {exp.company_name} - {exp.position}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">תאריך: {exp.created_at}</p>
                  <p className="text-sm text-gray-500 mb-1">תודות: {exp.thanks}</p>
                  <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </CardSimple>
        </GridContainer>




        <label>
          סינון לפי תפקיד:
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">כל התפקידים</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="QA Engineer">QA Engineer</option>
          </select>
        </label>

        <label>
          מינימום תודות:
          <input
            type="number"
            value={minThanks}
            onChange={(e) => setMinThanks(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </label>

        <label>
          מתאריך:
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </label>

        <label className="md:col-span-2">
          מיין לפי:
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">ללא מיון</option>
            <option value="thanks">הכי הרבה תודות</option>
            <option value="newest">הכי חדשות</option>
          </select>
        </label>
      </div>



      {/* רשימת החוויות */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {interviewExperiences.map((interviewExperience) => (
          <CardSimple
            key={interviewExperience.id}
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-[--color-border] overflow-hidden"
          >
            {/* Header עם אייקון אנונימי/לא אנונימי */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <IconWrapper
                  size="sm"
                  color={interviewExperience.anonymous ? "muted" : "primary-dark"}
                >
                  {interviewExperience.anonymous ? "💁‍♂️" : "👤"}
                </IconWrapper>
                <span className="text-sm text-[--color-secondary-text]">
                  {interviewExperience.anonymous ? "אנונימית" : "משתמשת רשומה"}
                </span>
              </div>

              {/* תאריך פרסום */}
              <div className="flex items-center gap-1 text-xs text-[--color-secondary-text]">
                <FaCalendarAlt />
                <span>{new Date(interviewExperience.created_at || '')?.toLocaleDateString()}</span>
              </div>
            </div>

            {/* פרטי החברה והתפקיד */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <IconWrapper size="sm" color="primary-dark">
                  <FaBriefcase />
                </IconWrapper>
                <div>
                  <h3 className="font-semibold text-[--color-text] text-lg">
                    {interviewExperience.company_name}
                  </h3>
                  <p className="text-[--color-secondary-text] text-sm">
                    {interviewExperience.position}
                  </p>
                </div>
              </div>
            </div>

            {/* תיאור מקוצר */}
            <div className="mb-4">
              <p className="text-[--color-text] text-sm leading-relaxed">
                {interviewExperience.description?.substring(0, 120)}
                {(interviewExperience.description?.length || 0) > 120 && "..."}
              </p>
            </div>

            {/* דירוג */}
            <div className="mb-4">
              <p className="text-sm text-[--color-secondary-text] mb-2">רמת ההנאה:</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => {
                  const rating = interviewExperience.rating || 0;
                  return (
                    <span
                      key={index}
                      className={`text-xl transition-colors ${index < rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                    >
                      {index < rating ? '★' : '☆'}
                    </span>
                  );
                })}
                <span className="text-sm text-[--color-secondary-text] mr-2">
                  ({interviewExperience.rating}/5)
                </span>
              </div>
            </div>

            {/* תודות וכפתור צפייה */}
            <div className="flex items-center justify-between pt-4 border-t border-[--color-border]">
              <div className="flex items-center gap-2 text-[--color-secondary-text]">
                <IconWrapper size="sm" color="accent">
                  <FaHeart />
                </IconWrapper>
                <span className="text-sm">
                  {getThunksByInterviewExperienceId(interviewExperience.id).length} תודות
                </span>
              </div>

              {/* <InterviewExperienceView
                interviewExperience={interviewExperience}
                experienceThanks={getThunksByInterviewExperienceId(interviewExperience.id)}
                users={users || []}
              /> */}
            </div>
          </CardSimple>
        ))}
      </div>
    </GridContainer>
  );
}