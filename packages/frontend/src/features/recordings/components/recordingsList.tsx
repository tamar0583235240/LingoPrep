import { TitleQuestions } from "./question";
import { RootState } from '../../../shared/store/store';
import { useSelector } from "react-redux";
import { Feedbackes } from "../../feedback/components/feedbackes";
import { useGetAnswersByIdUserQuery } from "../services/answerApi";
import { AiInsightsList } from "./AiInsightsList";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { Heading1 } from "../../../shared/ui/typography";
import { CardSimple } from "../../../shared/ui/card";
import { Button } from "../../../shared/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Answer } from "../types/Answer";
import { FilteringComponents } from "./filteringComponents";
import { SearchComponents } from "./searchComponents";
import { SortComponents } from "./sortComponents";
import { useGetAiInsightsQuery } from "../services/AiInsightsApi";
import ShareButton from "../../shared-recordings/components/ShareButton";
import ShareDialog from "../../shared-recordings/components/ShareDialog";


export const RecordingsList: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user?.id ?? '';
    console.log(user?.id);


const { data, error, isLoading } = useGetAnswersByIdUserQuery(userId, {
  skip: !userId,
});

    const { data: allInsights } = useGetAiInsightsQuery();

  const insightsMap = useMemo(() => {
    const map = new Map<string, number>();
    allInsights?.forEach((insight) => {
      map.set(insight.answer_id, insight.rating);
    });
    return map;
  }, [allInsights]);

  const [searchText, setSearchText] = useState('');
  const [filterCriteria, setFilterCriteria] = useState<{
    dateFilter: string;
    questionName: string;
    feedbackCategory: string;
    ratingFilter: number | null;
  }>({
    dateFilter: 'all',
    questionName: '',
    feedbackCategory: '',
    ratingFilter: null,
  });
  const [sortOption, setSortOption] = useState('latest');
  const [displayedAnswers, setDisplayedAnswers] = useState<Answer[]>([]);
  const [expandedRecordings, setExpandedRecordings] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(null);

  const toggleRecording = (recordingId: string) => {
    setExpandedRecordings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recordingId)) {
        newSet.delete(recordingId);
      } else {
        newSet.add(recordingId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (!data) return;

    (async () => {
      let results = [...data];


      if (searchText.trim()) {
        results = results.filter(a =>
          a.answer_file_name.toLowerCase().includes(searchText.toLowerCase())
        );
      }


      results = results.filter(a => {
        const qok = !filterCriteria.questionName || a.question_id === filterCriteria.questionName;
        const fb = filterCriteria.feedbackCategory;
        const fbok =
          !fb ||
          (fb === 'none' && a.amount_feedbacks === 0) ||
          (fb === 'low' && a.amount_feedbacks >= 1 && a.amount_feedbacks <= 3) ||
          (fb === 'high' && a.amount_feedbacks >= 4);
        return qok && fbok;
      });

      if (filterCriteria.dateFilter === 'latest') {
        const latest = results.reduce((a, b) =>
          new Date(b.submitted_at) > new Date(a.submitted_at) ? b : a
        );
        results = [latest];
      } else if (filterCriteria.dateFilter === 'lastWeek') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        results = results.filter(a => new Date(a.submitted_at) >= weekAgo);
      } else if (filterCriteria.dateFilter === 'lastMonth') {
        const mAgo = new Date();
        mAgo.setDate(mAgo.getDate() - 30);
        results = results.filter(a => new Date(a.submitted_at) >= mAgo);
      }

   
      if (filterCriteria.ratingFilter !== null) {
        results = results.filter(ans => {
          const rating = insightsMap.get(ans.id);
          return rating === filterCriteria.ratingFilter;
        });
      }

   
      results.sort((a, b) => {
        switch (sortOption) {
          case 'latest':
            return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
          case 'oldest':
            return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
          case 'mostFeedbacks':
            return b.amount_feedbacks - a.amount_feedbacks;
          case 'leastFeedbacks':
            return a.amount_feedbacks - b.amount_feedbacks;
          default:
            return 0;
        }
      });

      setDisplayedAnswers(results);
    })();
  }, [data, searchText, filterCriteria, sortOption]);

  if (isLoading) return (
    <GridContainer className="text-center" dir="rtl">
      <Heading1>טוען הקלטות...</Heading1>
    </GridContainer>
  );

  if (error || !data) return (
    <GridContainer className="text-center" dir="rtl">
      <Heading1>שגיאה בטעינת הקלטות</Heading1>
    </GridContainer>
  );

  return (
    <GridContainer maxWidth="lg" className="text-center" dir="rtl" padding="px-2 sm:px-4 lg:px-6">
      <FilteringComponents
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
        originalAnswers={data}
      />

      <Heading1 className="mb-8">ההקלטות שלי</Heading1>

      <div className="top-controls">
        <SearchComponents searchText={searchText} setSearchText={setSearchText} />
      </div>

      <SortComponents sortOption={sortOption} setSortOption={setSortOption} />

      <div className="space-y-4">
        {displayedAnswers.map((recording, index) => {
          const isExpanded = expandedRecordings.has(recording.id);

          return (
            <CardSimple
              key={recording.id}
              className="w-full max-w-2xl mx-auto overflow-hidden hover:shadow-lg transition-shadow
                                       xl:max-w-3xl xl:w-4/5
                                       lg:max-w-2xl lg:w-4/5  
                                       md:max-w-xl md:w-4/5
                                       sm:max-w-lg sm:w-4/5
                                       max-sm:w-11/12 max-sm:max-w-sm"
            >
              <div className="bg-primary-dark text-white py-3 px-4 -m-4 mb-4 flex flex-row justify-between items-center
                                           xl:px-16 xl:py-3.5
                                           lg:px-12 lg:py-3
                                           md:px-8 md:py-3 md:flex-row
                                           sm:px-6 sm:py-3 sm:flex-col sm:gap-3 sm:text-center
                                           max-sm:px-4 max-sm:py-2.5 max-sm:flex-col max-sm:gap-2 max-sm:text-center">

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleRecording(recording.id)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <span className="text-lg font-bold
                                                   lg:text-xl
                                                   md:text-lg
                                                   sm:text-base
                                                   max-sm:text-sm">
                    מענה לשאלה:
                  </span>
                  <div className="text-lg font-bold
                                                   lg:text-xl
                                                   md:text-lg
                                                   sm:text-base
                                                   max-sm:text-sm">
                    <TitleQuestions data={recording.question_id} />
                  </div>
                </div>

               <div className="flex gap-6">
                  <a href={recording.file_url} download>
                    <Button
                      variant="transparent"
                      size="sm"
                      className="bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all
                  sm:text-xs sm:px-3 sm:py-1.5
                  max-sm:text-xs max-sm:px-2 max-sm:py-1"
                      icon={
                        <svg className="w-6 h-6 sm:w-5 sm:h-5 max-sm:w-4 max-sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z" fill="currentColor" />
                          <path d="M5 20V18H19V20H5Z" fill="currentColor" />
                        </svg>
                      }
                      iconPosition="right"
                    >
                      הורדה
                    </Button>
                  </a>
                  <ShareButton setIsDialogOpen={() => {
                    setSelectedRecordingId(recording.id);
                    setIsDialogOpen(true);
                  }} />
                </div>
              </div>

              {isExpanded && (
                <div className="transition-all duration-300 ease-in-out">
                  <div className="grid grid-cols-1 gap-4 items-center py-2 px-4 border-t border-muted
                                                   xl:px-16 xl:py-3
                                                   lg:px-12 lg:py-2.5
                                                   md:px-8 md:py-2
                                                   sm:px-6 sm:py-2
                                                   max-sm:px-4 max-sm:py-2">
                    <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                      <span className="text-sm text-text-secondary font-medium">תאריך הגשה:</span>
                      <span className="text-sm text-text-main font-semibold bg-muted px-2 py-1 rounded-md">
                        {new Date(recording.submitted_at).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center py-2 px-4 border-t border-muted
                                                   xl:px-16 xl:py-3
                                                   lg:px-12 lg:py-2.5
                                                   md:px-8 md:py-2
                                                   sm:px-6 sm:py-2
                                                   max-sm:px-4 max-sm:py-2">
                    <audio
                      className="w-full max-w-2xl h-8 outline-none
                                                      xl:w-4/5
                                                      lg:w-11/12
                                                      md:w-full
                                                      sm:w-full sm:h-8
                                                      max-sm:w-full max-sm:h-8"
                      controls
                    >
                      <source src={recording.file_url} type="audio/mpeg" />
                      הדפדפן שלך לא תומך בנגן האודיו
                    </audio>
                  </div>

                  <AiInsightsList answerId={recording.id} />
                  <Feedbackes props={{ sharedRecordingId: recording.id, usersList: [] }} />

                  <div className="flex items-center justify-center pb-4">
                    {Array.from({ length: 5 }, (_, index) => {
                      const rating = insightsMap.get(recording.id) || 0;
                      return (
                        <span key={index} className={`text-yellow-500 text-2xl `}>{index < rating ? '★' : '☆'}</span>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardSimple>
          );
        })}
      </div>
      {isDialogOpen && selectedRecordingId && (
        <ShareDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          recordingId={selectedRecordingId}
          userId={userId}
        />
      )}
    </GridContainer>
  );
}; 