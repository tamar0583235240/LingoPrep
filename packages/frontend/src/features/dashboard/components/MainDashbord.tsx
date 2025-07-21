import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import type { RootState } from "../../../shared/store/store";

import { useUserStore } from "../store/progressSlice";
import { useDynamicContents } from "../../dynamicContent/hooks/useDynamicContents";

import { Certificate } from "./Certificate";
import { SummaryStrengths } from "./Strengths";
import { ImprovementSuggestions } from "./ImprovementSuggestions";
import AIInsightsList from "./AIInsightsList";
import ProgressStats from "./ProgressStats";

import { Heading1 } from "../../../shared/ui/typography";

export const MainDashboard: React.FC = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const authState = useSelector((state: RootState) => state.auth);

  // המרה של המשתמש ל-camelCase
const user = authState.user
  ? {
      firstName: (authState.user as any).first_name ?? authState.user.first_name,
      lastName: (authState.user as any).last_name ?? authState.user.last_name,
    }
  : null;


  const userName = user?.firstName || "משתמש ללא שם";
  const userLastName = user?.lastName || "";

  console.log("✅ userName in MainDashboard:", userName);
  console.log("✅ userLastName in MainDashboard:", userLastName);

  const { answered, total } = useUserStore();
  const isComplete = answered === total && total > 0;

  const { contents, loading, error } = useDynamicContents();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      certificateRef.current &&
      !certificateRef.current.contains(e.target as Node)
    ) {
      setShowCertificate(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">טוען כותרות...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const titleItem = contents.find((item) => item.key_name === "profile_title");

  return (
    <>
      {showCertificate && (
        <div
          className="fixed inset-0 z-50 bg-gray-100/90 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={handleOverlayClick}
        >
          <div ref={certificateRef}>
<Certificate first_name={user?.firstName ?? ""} last_name={user?.lastName ?? ""} />
          </div>
        </div>
      )}

      <motion.div
        className="min-h-screen p-6 bg-gradient-to-br from-[--color-background] via-white to-[--color-primary]/10 text-right space-y-12"
        dir="rtl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <Heading1 className="text-[--color-text] mb-2">
            {titleItem
              ? titleItem.content
              : "הפרופיל המקצועי שלך בעיניים של AI"}
          </Heading1>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <SummaryStrengths />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <ImprovementSuggestions />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
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
    </>
  );
};

export default MainDashboard;
