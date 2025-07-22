import { BadgeCheck, LayoutDashboard, Sparkles } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import { SummaryBox } from "../../../shared/ui/SummaryBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import { Certificate } from '../../dashboard/components/Certificate';


interface EndSurveyProps {
  showEndButton: boolean;
  answeredCount: number;
  totalQuestions: number;
}
const EndSurvey: React.FC<EndSurveyProps> = ({ showEndButton, answeredCount, totalQuestions }) => {
  const [showEnd, setShowEnd] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  if (!showEndButton) return null; // לא מציגים כלל אם לא כולם נענו
  return (
<>
  <Button
    variant="primary-dark"
    size="md"
    icon={<Sparkles className="w-5 h-5" />}
    iconPosition="left"
    onClick={() => setShowEnd(true)}
    className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
  >
    סיום השאלון
  </Button>
      {showEnd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-2xl p-8 shadow-xl w-full max-w-md text-right border border-[--color-border] animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4"
              aria-label="סגור"
              onClick={() => setShowEnd(false)}
              iconPosition="left"
              icon={<span className="text-gray-400 hover:text-gray-600 transition">×</span>}
            />
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Sparkles className="text-yellow-500 w-6 h-6" />
              <span className="text-xl font-bold text-text-main">ברכות לרגל סיום השאלון!</span>
            </div>
            <SummaryBox
              title="שאלות שענית"
              value={answeredCount.toString()}
              description={`מתוך ${totalQuestions}`}
              icon={<BadgeCheck />}
              iconColor="success"
              className="mb-4"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary-dark"
                size="md"
                icon={<BadgeCheck className="w-5 h-5" />}
                iconPosition="left"
                fullWidth
                onClick={() => setShowCertificate(true)}
              >
                הנפקת תעודה
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<LayoutDashboard className="w-5 h-5" />}
                iconPosition="left"
                fullWidth
                onClick={() => navigate("/dashboard")}
              >
                לדשבורד
              </Button>
            </div>
          </div>
        </div>
      )}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4"
              aria-label="סגור"
              onClick={() => setShowCertificate(false)}
              iconPosition="left"
              icon={<span className="text-gray-400 hover:text-gray-600 transition">×</span>}
            />
            <Certificate
              first_name={user?.first_name || ""}
              last_name={user?.last_name || ""}
            />
          </div>
        </div>
      )}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4"
              aria-label="סגור"
              onClick={() => setShowCertificate(false)}
              iconPosition="left"
              icon={<span className="text-gray-400 hover:text-gray-600 transition">×</span>}
            />
            <Certificate
              first_name={user?.first_name || ""}
              last_name={user?.last_name || ""}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default EndSurvey;
