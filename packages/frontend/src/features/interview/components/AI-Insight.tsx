import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { useState, useEffect } from "react";
import MagicLoader from "./MagicLoader";
import { setAI_Insight, setIsAnalyzing } from "../store/AI_InsightSlice";
export const AI_Insight = (props: any) => {
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
            {/* הצגת תוצאת ניתוח AI */}
            {AI_result && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
                    <div className="font-bold mb-2">תוצאת ניתוח AI:</div>
                    <div>
                        {typeof AI_result === 'string' ? (
                            AI_result
                        ) : (
                            <div>
                                {'summary' in AI_result && <div><b>סיכום:</b> {AI_result.summary}</div>}
                                {'rating' in AI_result && <div><b>דירוג:</b> {AI_result.rating}</div>}
                                {'strengths' in AI_result && <div><b>חוזקות:</b> {AI_result.strengths}</div>}
                                {'improvements' in AI_result && <div><b>הצעות לשיפור:</b> {AI_result.improvements}</div>}
                                {'flow' in AI_result && <div><b>שטף:</b> {AI_result.flow}</div>}
                                {'confidence' in AI_result && <div><b>ביטחון:</b> {AI_result.confidence}</div>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};






