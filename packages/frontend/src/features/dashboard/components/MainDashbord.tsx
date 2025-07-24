import React, { useRef, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../../../shared/store/store";
import AIInsightsList from "./AIInsightsList";
import ProgressStats from "./ProgressStats";
import { SummaryStrengths } from "./Strengths";
import { Certificate } from "./Certificate";
import { Award } from "lucide-react";
import { useUserStore } from "../store/progressSlice";
import { motion } from "framer-motion";
import type { RootState } from "../../../shared/store/store";
import { ImprovementSuggestions } from "./ImprovementSuggestions";

const MainDashboard: React.FC = () => {
  const userName = useSelector(
    (state: RootState) => state.auth?.user?.firstName !
  );
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const { answered, total } = useUserStore();
  const isComplete = answered === total && total > 0;


  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      certificateRef.current &&
      !certificateRef.current.contains(e.target as Node)
    ) {
      setShowCertificate(false);
    }
  };

  return (
    <Provider store={store}>
      {/* שכבת תעודה */}
      {showCertificate && (
        <div
          className="fixed inset-0 z-50 bg-gray-100/90 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={handleOverlayClick}
        >
          <div ref={certificateRef}>
            <Certificate fullName={userName} />
          </div>
        </div>
      )}

      {/* תוכן ראשי */}
      <motion.div
        className="min-h-screen p-6 bg-gradient-to-br from-[--color-background] via-white to-[--color-primary]/10 text-right space-y-12"
        dir="rtl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className="text-2xl font-bold text-[--color-text]">
            הפרופיל המקצועי שלך בעיניים של AI
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <SummaryStrengths />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <ImprovementSuggestions />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AIInsightsList />
          </motion.div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <ProgressStats />
        </motion.div>

        {/* {!showCertificate && (
          <motion.div
            className="max-w-md mx-auto text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setShowCertificate(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:shadow-xl transition"
            >
              <Award size={24} className="text-white" />
              תעודת מוכנות לראיון
            </button>
          </motion.div>
        )} */}

        {isComplete && !showCertificate && (
          <motion.div
            className="max-w-md mx-auto text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setShowCertificate(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:shadow-xl transition"
            >
              <Award size={24} className="text-white" />
              תעודת מוכנות לראיון
            </button>
          </motion.div>
        )}
      </motion.div>
    </Provider>
  );
};

export default MainDashboard;
