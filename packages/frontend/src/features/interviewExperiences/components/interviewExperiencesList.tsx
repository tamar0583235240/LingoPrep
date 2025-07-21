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
import { Heading1, Heading2, Paragraph } from "../../../shared/ui/typography";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { FaHeart, FaCalendarAlt, FaEye, FaBriefcase, FaBaby } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from '../../../shared/ui/button';
import { Input } from "../../../shared/ui/input";
import { Grid } from "../../../shared/ui/grid";
import { Sidebar } from "lucide-react";
import { SectionWrapper } from "../../../shared/ui/SectionWrapper";


export const InterviewExperiencesList = () => {
  const { data: interviewExperiences, isLoading, isError } = useGetAllInterviewExperiencesQuery();
  const { data: experienceThanks, isLoading: thanksLoading, isError: thanksError } = useGetAllExperienceThanksQuery();
  const { data: users, isLoading: usersLoading, isError: usersError } = useGetUsersQuery();

  const [searchCompany, setSearchCompany] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [minThanks, setMinThanks] = useState(0);
  const [filterDate, setFilterDate] = useState("");
  const [sortOption, setSortOption] = useState("");

  function getThanksCount(id: string): number {
    return experienceThanks?.filter(thank => thank.experience_id === id).length || 0;
  }

  if (isLoading) return <p>טוען...</p>;
  if (isError || !interviewExperiences) return <p>שגיאה בטעינת נתונים</p>;

  const filteredData = interviewExperiences
    .filter((item) => item.company_name.toLowerCase().includes(searchCompany.toLowerCase()))
    .filter((item) => item.position.toLowerCase().includes(filterPosition.toLowerCase()))
    .filter((item) => getThanksCount(item.id) >= minThanks)
    .filter((item) => {
      if (!filterDate) return true;
      const itemDate = new Date(item.created_at || '').toLocaleDateString();
      return itemDate === new Date(filterDate).toLocaleDateString();
    });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === "thanks") {
      return getThanksCount(b.id) - getThanksCount(a.id);
    } else if (sortOption === "date") {
      return new Date(b.created_at ?? '').getTime() - new Date(a.created_at ?? '').getTime();
    }
    return 0;
  });

  function getThunksByInterviewExperienceId(interviewExperienceId: string): experienceThanks[] {
    console.log(interviewExperienceId);
    
    return (experienceThanks ? experienceThanks.filter(thanks => thanks.experience_id === interviewExperienceId) : []);
  }

  if (isLoading) {
    return (
      <GridContainer maxWidth="lg" className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </GridContainer>
    );
  }

  if (isError) {
    return (
      <GridContainer maxWidth="lg">
        <EmptyState
          icon={<FaBriefcase />}
          title="אירעה שגיאה"
          description="לא הצלחנו לטעון את חוויות הראיונות. אנא נסה שוב מאוחר יותר."
          iconColor="danger"
        />
      </GridContainer>
    );
  }

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
      {/* אפשרויות סינון ומיון */}
      <GridContainer maxWidth="lg">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">סנן לפי</h2>

          <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <Input placeholder="שם חברה" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} className="border p-2 rounded" />
            <Input placeholder="תפקיד" value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)} className="border p-2 rounded" />
            <Input type="number" placeholder="כמות תודות מינימלית" value={minThanks} onChange={(e) => setMinThanks(Number(e.target.value))} className="border p-2 rounded" />
            <Input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border p-2 rounded" />
          </Grid>

          <h2 className="text-xl font-semibold">מיין לפי</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="sort" value="thanks" checked={sortOption === "thanks"} onChange={() => setSortOption("thanks")} />
              הכי הרבה תודות
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="sort" value="date" checked={sortOption === "date"} onChange={() => setSortOption("date")} />
              הכי חדשות
            </label>
          </div>

        </div>
      </GridContainer>

      {/* רשימת החוויות */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedData.map((interviewExperience) => (
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
                  {getThanksCount(interviewExperience.id)} תודות
                </span>
              </div>

              <InterviewExperienceView
                interviewExperience={interviewExperience}
                experienceThanks={getThunksByInterviewExperienceId(interviewExperience.id)}
                users={users || []}
              />
            </div>
          </CardSimple>
        ))}
      </div>
    </GridContainer>
  );
}