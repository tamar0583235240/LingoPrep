import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AI_InsightType } from "../types/AI_Insight";



type AI_InsightState = {
    AI_result: AI_InsightType | string | null;
    isAnalyzing: boolean;
};

const initialState: AI_InsightState = {
    AI_result: null,
    isAnalyzing: false,
};

const AI_InsightSlice = createSlice({
    name: "AI_InsightSlice",
    initialState,
    reducers: {
        setAI_Insight: (state, action: PayloadAction<AI_InsightType | null | string>) => {
            state.AI_result = action.payload;
        },
        clearAI_Insight: (state) => {
            state.AI_result = null;
        },
        setIsAnalyzing: (state, action: PayloadAction<boolean>) => {
            state.isAnalyzing = action.payload;
        }

    },
});

export const { setAI_Insight, clearAI_Insight, setIsAnalyzing } =
    AI_InsightSlice.actions;

export default AI_InsightSlice.reducer;
