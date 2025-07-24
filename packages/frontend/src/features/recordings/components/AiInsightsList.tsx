import { useState } from "react";
import { Brain, ChevronDown, ChevronUp, Star, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { useGetAiInsightsByAnswerIdQuery } from "../services/AiInsightsApi";
import { Button } from "../../../shared/ui/button";
import { CardSimple } from "../../../shared/ui/card";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { Paragraph } from "../../../shared/ui/typography";


export const AiInsightsList = (props: any) => {
    const { answerId } = props
    const { data, isLoading, isError } = useGetAiInsightsByAnswerIdQuery(answerId);
    const [viewAiIn, setViewAiIn] = useState(false)

    if (isLoading) {
        return (
            <GridContainer maxWidth="lg" className="text-center">
                <CardSimple className="p-8">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                </CardSimple>
            </GridContainer>
        )
    }

    if (isError) {
        return (
            <GridContainer maxWidth="lg">
                <CardSimple className="p-6 border-red-200 bg-red-50">
                    <div className="flex items-center gap-3 text-red-600">
                        <IconWrapper color="danger" size="md">
                            <AlertCircle size={20} />
                        </IconWrapper>
                        <Paragraph className="text-red-600 mb-0">
                            שגיאה בטעינת תובנות ה-AI. אנא נסה שוב מאוחר יותר.
                        </Paragraph>
                    </div>
                </CardSimple>
            </GridContainer>
        )
    }

    return (
        <GridContainer maxWidth="lg" className="space-y-6">
            {/* כפתור הצגת תובנות */}
            <div className="flex justify-center">
                <Button
                    onClick={() => setViewAiIn(!viewAiIn)}
                    variant="primary-dark"
                    size="lg"
                    icon={viewAiIn ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    iconPosition="right"
                    className="min-w-[200px]"
                >
                    {viewAiIn ? 'הסתר תובנות' : 'הצג תובנות'} AI
                </Button>
            </div>

            {/* רשימת התובנות */}
            {viewAiIn && (
                <div className="space-y-4">
                    {data && data.length > 0 ? (
                        <div className="grid gap-6">
                            {data.map((insight) => (
                                <CardSimple key={insight.id} className="p-6 hover:shadow-md transition-shadow">
                                    <div className="space-y-6">
                                        {/* כותרת התובנה */}
                                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                            <IconWrapper color="primary-dark" size="md">
                                                <Brain size={20} />
                                            </IconWrapper>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                ניתוח AI מפורט
                                            </h3>
                                        </div>

                                        {/* תוכן התובנות */}
                                        <div className="grid gap-4">
                                            {/* סיכום */}
                                            <div className="bg-blue-50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <IconWrapper color="primary-dark" size="sm">
                                                        <Lightbulb size={16} />
                                                    </IconWrapper>
                                                    <span className="font-semibold text-blue-900">סיכום:</span>
                                                </div>
                                                <Paragraph className="text-blue-800 mb-0 leading-relaxed">
                                                    {insight.summary}
                                                </Paragraph>
                                            </div>

                                            {/* דירוג */}
                                            <div className="bg-yellow-50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <IconWrapper color="accent" size="sm">
                                                        <Star size={16} />
                                                    </IconWrapper>
                                                    <span className="font-semibold text-yellow-900">דירוג:</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-yellow-800">
                                                        {insight.rating}
                                                    </span>
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={16}
                                                                className={i < insight.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* נקודות חוזק */}
                                            <div className="bg-green-50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <IconWrapper color="success" size="sm">
                                                        <TrendingUp size={16} />
                                                    </IconWrapper>
                                                    <span className="font-semibold text-green-900">נקודות חוזק:</span>
                                                </div>
                                                <Paragraph className="text-green-800 mb-0 leading-relaxed">
                                                    {insight.strengths}
                                                </Paragraph>
                                            </div>

                                            {/* הצעות לשיפור */}
                                            <div className="bg-orange-50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <IconWrapper color="secondary" size="sm">
                                                        <AlertCircle size={16} />
                                                    </IconWrapper>
                                                    <span className="font-semibold text-orange-900">הצעות לשיפור:</span>
                                                </div>
                                                <Paragraph className="text-orange-800 mb-0 leading-relaxed">
                                                    {insight.improvements}
                                                </Paragraph>
                                            </div>
                                        </div>
                                    </div>
                                </CardSimple>
                            ))}
                        </div>
                    ) : (
                        <CardSimple className="p-8 text-center">
                            <IconWrapper color="muted" size="lg" className="mx-auto mb-4">
                                <Brain size={24} />
                            </IconWrapper>
                            <Paragraph className="text-gray-500 mb-0">
                                עדיין לא נוצרו תובנות AI עבור התשובה הזו
                            </Paragraph>
                        </CardSimple>
                    )}
                </div>
            )}
        </GridContainer>
    );
};