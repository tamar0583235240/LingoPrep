import { useState, useEffect } from 'react';
import { Question } from '../types/Question';
import { useUpdateQuestionMutation, useGetAllCategoriesQuery, useGetCategoryForQuestionQuery } from '../services/adminQuestionApi';
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { CardSimple } from "../../../shared/ui/card";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { Heading1 } from "../../../shared/ui/typography";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { useMessageModal } from "../../../shared/ui/MessageModalContext";
import { X, Save, Edit, ChevronDown } from "lucide-react";
import { cn } from "../../../shared/utils/cn";
import { Category } from '../types/Categories';

export const UpdateQuestion = (props: { question: Question, questionSaveClick: Function }) => {
    const { question, questionSaveClick } = props;
    const [updateQuestionById, { isLoading }] = useUpdateQuestionMutation();
    const { data: categories } = useGetAllCategoriesQuery();
    const { showMessage } = useMessageModal();


    const [titleQ, setTitleQ] = useState(question.title);
    const [contentQ, setContentQ] = useState(question.content);
    const [categoryQ, setCategoryQ] = useState<Category | null>(null);
    const [tipsQ, setTipsQ] = useState(question.tips);
    const [ai_guidanceQ, setAi_guidanceQ] = useState(question.ai_guidance);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);




    const { data: selectedCategoryData, refetch, error, isLoading: isCategoryLoading } =
        useGetCategoryForQuestionQuery(question.id, {
            skip: !question.id,
        });

    useEffect(() => {
        if (selectedCategoryData) {
            setCategoryQ(selectedCategoryData);
        }
    }, [selectedCategoryData]);


    const handleCategorySelect = (categoryName: string, categoryId: string) => {
        const categorySelected: Category = {
            id: categoryId,
            name: categoryName,
        };
        setCategoryQ(categorySelected);
        setIsCategoryDropdownOpen(false);
    };

    const updateQuestionF = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // אם אין קטגוריה נבחרת, נשתמש בקטגוריה ריקה או נציג אזהרה
        if (!categoryQ) {
            showMessage("אזהרה", "לא נבחרה קטגוריה. האם להמשיך?");
            // אפשר להמשיך בלי קטגוריה או לעצור כאן
        }

        const UpdateQuestionn: Partial<Question> = {
            id: question.id,
            title: titleQ,
            content: contentQ,
            tips: tipsQ,
            ai_guidance: ai_guidanceQ,
            is_active: true
        };

        console.log("UpdateQuestionn", UpdateQuestionn);
        console.log("categoryQ", categoryQ);

        try {
            // אם יש קטגוריה, נשלח אותה. אחרת נשלח null או undefined
            await updateQuestionById({
                data: UpdateQuestionn,
                category: categoryQ || { id: '', name: '' }
            }).unwrap();
            showMessage("הצלחה!", "השאלה עודכנה בהצלחה");
            questionSaveClick();
            await refetch();
        } catch (e: any) {
            console.error('שגיאה בעדכון השאלה:', e);
            const errorMessage = e?.data?.message || e?.message || 'שגיאה לא ידועה';
            showMessage("שגיאה", `שגיאה בעדכון השאלה: ${errorMessage}`);
        }
    }



    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardSimple className="m-0 border-0 shadow-none">
                    {/* כותרת המודל */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <IconWrapper color="primary-dark" size="lg">
                                <Edit size={24} />
                            </IconWrapper>
                            <Heading1 className="text-2xl">עריכת שאלה</Heading1>
                        </div>
                        <Button
                            onClick={() => questionSaveClick()}
                            variant="ghost"
                            size="sm"
                            icon={<X size={20} />}
                        />
                    </div>

                    {/* טופס עריכת שאלה */}
                    <form onSubmit={updateQuestionF} className="space-y-6">
                        <GridContainer
                            gridClasses="grid-cols-1 gap-6"
                            padding="p-0"
                            mt="mt-0"
                            mb="mb-0"
                        >
                            {/* שם השאלה */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-semibold text-gray-700 text-right"
                                >
                                    שם השאלה *
                                </label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="הכנס את שם השאלה..."
                                    value={titleQ}
                                    onChange={(e) => setTitleQ(e.target.value)}
                                    required
                                    className="text-right"
                                />
                            </div>

                            {/* תוכן השאלה */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-semibold text-gray-700 text-right"
                                >
                                    תוכן השאלה *
                                </label>
                                <textarea
                                    id="content"
                                    placeholder="הכנס את תוכן השאלה המלא..."
                                    value={contentQ}
                                    onChange={(e) => setContentQ(e.target.value)}
                                    required
                                    rows={4}
                                    className={cn(
                                        "w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary]",
                                        "text-right resize-vertical"
                                    )}
                                />
                            </div>

                            {/* קטגוריה */}
                            <div className="space-y-2 relative">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-semibold text-gray-700 text-right"
                                >
                                    קטגוריה *
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                        className={cn(
                                            "w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary]",
                                            "text-right bg-white flex items-center justify-between",
                                            "hover:bg-gray-50 transition-colors"
                                        )}
                                    >
                                        <ChevronDown
                                            size={16}
                                            className={cn(
                                                "transition-transform",
                                                isCategoryDropdownOpen && "rotate-180"
                                            )}
                                        />
                                        <span className={cn("text-right flex-1",
                                            categoryQ ? "text-gray-900" : "text-gray-500"
                                        )}>
                                            {isCategoryLoading
                                                ? "טוען קטגוריה..."
                                                : categoryQ?.name || "בחר קטגוריה..."}
                                        </span>
                                    </button>

                                    {isCategoryDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                            {categories && categories.length > 0 ? (
                                                categories.map((category: any) => (
                                                    <button
                                                        key={category.id}
                                                        type="button"
                                                        onClick={() => handleCategorySelect(category.name, category.id)}
                                                        className={cn(
                                                            "w-full px-3 py-2 text-right hover:bg-gray-100 transition-colors text-sm",
                                                            categoryQ?.id === category.id && "bg-blue-50 text-blue-700"
                                                        )}
                                                    >
                                                        {category.name}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-right text-gray-500 text-sm">
                                                    אין קטגוריות זמינות
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* טיפים למענה */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="tips"
                                    className="block text-sm font-semibold text-gray-700 text-right"
                                >
                                    טיפים למענה *
                                </label>
                                <textarea
                                    id="tips"
                                    placeholder="הכנס טיפים שיעזרו למועמד לענות על השאלה..."
                                    value={tipsQ}
                                    onChange={(e) => setTipsQ(e.target.value)}
                                    required
                                    rows={3}
                                    className={cn(
                                        "w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary]",
                                        "text-right resize-vertical"
                                    )}
                                />
                            </div>

                            {/* הוראות AI */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="ai_guidance"
                                    className="block text-sm font-semibold text-gray-700 text-right"
                                >
                                    הוראות למערכת AI *
                                </label>
                                <textarea
                                    id="ai_guidance"
                                    placeholder="הכנס הוראות למערכת AI לגבי איך להעריך תשובות לשאלה זו..."
                                    value={ai_guidanceQ}
                                    onChange={(e) => setAi_guidanceQ(e.target.value)}
                                    required
                                    rows={3}
                                    className={cn(
                                        "w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary]",
                                        "text-right resize-vertical"
                                    )}
                                />
                            </div>
                        </GridContainer>

                        {/* כפתורי פעולה */}
                        <div className="flex gap-3 pt-6 border-t border-gray-200">
                            <Button
                                type="button"
                                onClick={() => questionSaveClick()}
                                variant="outline"
                                size="md"
                                fullWidth
                            >
                                ביטול
                            </Button>
                            <Button
                                type="submit"
                                variant="primary-dark"
                                size="md"
                                fullWidth
                                isLoading={isLoading}
                                icon={<Save size={18} />}
                                iconPosition="right"
                            >
                                שמור שינויים
                            </Button>
                        </div>
                    </form>
                    </CardSimple>
            </div>
        </div>
    );
};

