import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import MagicLoader from "./MagicLoader";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { AlertCircle, Brain, CheckCircle, Lightbulb, Star, TrendingUp, Zap } from "lucide-react";
import { Paragraph } from "../../../shared/ui/typography";

export const AI_Insight = () => {
  const { AI_result, isAnalyzing } = useSelector((state: RootState) => state.AI_Insight);

  if (isAnalyzing && !AI_result) {
    return (
      <div className="flex justify-center items-center mt-4">
        <MagicLoader />
      </div>
    );
  }

  return (
    <div>
      {AI_result && (
        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-xl text-gray-900 space-y-6">
          {/* כותרת כללית */}
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <IconWrapper color="primary-dark" size="md">
              <Brain size={20} />
            </IconWrapper>
            <h3 className="text-lg font-semibold">ניתוח AI מפורט</h3>
          </div>

          <div className="space-y-4">
            {typeof AI_result === "string" ? (
              <Paragraph className="text-gray-800 mb-0 leading-relaxed">
                {AI_result}
              </Paragraph>
            ) : (
              <>
                {/* סיכום */}
                {AI_result.summary && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconWrapper color="primary-dark" size="sm">
                        <Lightbulb size={16} />
                      </IconWrapper>
                      <span className="font-semibold text-blue-900">סיכום:</span>
                    </div>
                    <Paragraph className="text-blue-800 mb-0 leading-relaxed">
                      {AI_result.summary}
                    </Paragraph>
                  </div>
                )}

                

                
                {/* נקודות חוזק */}
                {AI_result.strengths && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconWrapper color="success" size="sm">
                        <TrendingUp size={16} />
                      </IconWrapper>
                      <span className="font-semibold text-green-900">נקודות חוזק:</span>
                    </div>
                    <Paragraph className="text-green-800 mb-0 leading-relaxed">
                      {AI_result.strengths}
                    </Paragraph>
                  </div>
                )}

                {/* הצעות לשיפור */}
                {AI_result.improvements && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconWrapper color="secondary" size="sm">
                        <AlertCircle size={16} />
                      </IconWrapper>
                      <span className="font-semibold text-orange-900">הצעות לשיפור:</span>
                    </div>
                    <Paragraph className="text-orange-800 mb-0 leading-relaxed">
                      {AI_result.improvements}
                    </Paragraph>
                  </div>
                )}
                {/* שטף */}
                {AI_result.flow && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconWrapper color="muted" size="sm">
                        <Zap size={16} />
                      </IconWrapper>
                      <span className="font-semibold text-purple-900">שטף:</span>
                    </div>
                    <Paragraph className="text-purple-800 mb-0 leading-relaxed">
                      {AI_result.flow}
                    </Paragraph>
                  </div>
                )}

                {/* ביטחון */}
                {AI_result.confidence && (
                  <div className="bg-teal-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconWrapper color="primary-dark" size="sm">
                        <CheckCircle size={16} />
                      </IconWrapper>
                      <span className="font-semibold text-teal-900">ביטחון:</span>
                    </div>
                    <Paragraph className="text-teal-800 mb-0 leading-relaxed">
                      {AI_result.confidence}
                    </Paragraph>
                  </div>
                )}


                {/* דירוג */}
                {typeof AI_result.rating === "number" && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconWrapper color="accent" size="sm">
                        <Star size={16} />
                      </IconWrapper>
                      <span className="font-semibold text-yellow-900">דירוג:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-yellow-800">
                        {AI_result.rating}
                      </span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < AI_result.rating!
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
