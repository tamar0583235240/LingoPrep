import { useState } from "react"
import { Button } from "../../../shared/ui/button"
import { Input } from "../../../shared/ui/input"
import { CardSimple } from "../../../shared/ui/card"
import { GridContainer } from "../../../shared/ui/GridContainer"
import { Heading1 } from "../../../shared/ui/typography"
import { IconWrapper } from "../../../shared/ui/IconWrapper"
import { useMessageModal } from "../../../shared/ui/MessageModalContext"
import { Plus, X, FileQuestion, ChevronDown } from "lucide-react"
import { cn } from "../../../shared/utils/cn"
import {  useAddQuestionMutation, useGetAllCategoriesQuery } from "../services/adminQuestionApi"
import { Category } from '../types/Categories';
import { Question } from "../types/Question"
import { AddCategory } from "./AddCategory"

export const AddQuestion = () => {
    const [addQuestion, { isLoading, isSuccess, isError, error }] = useAddQuestionMutation()
    const { data: categories } = useGetAllCategoriesQuery()
    const { showMessage } = useMessageModal()
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [newQuestion, setNewQuestion] = useState<Question>({
        id: "00000000-0000-0000-0000-000000000000",
        title: "",
        content: "",
        tips: "",
        ai_guidance: "",
        is_active: true
    })


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!selectedCategory) {
            showMessage("שגיאה", "יש לבחור קטגוריה לשאלה")
            return
        }

        try {
            console.log("hfgfg", newQuestion)
            await addQuestion({ question: { ...newQuestion, category: selectedCategory.id }, id_category: selectedCategory.id }).unwrap()
            showMessage("הצלחה!", "השאלה נוספה בהצלחה למאגר השאלות")

            setNewQuestion({
                id: "00000000-0000-0000-0000-000000000000",
                title: "",
                content: "",
                tips: "",
                ai_guidance: "",
                is_active: true
            })
            setSelectedCategory(null)
            setIsModalOpen(false)
        } catch (err) {
            showMessage("שגיאה", `שגיאה בהוספת השאלה: ${err}`)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setNewQuestion(prev => ({ ...prev, [field]: value }))
    }

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category)
        setIsCategoryDropdownOpen(false)
    }

   
    return (
        <>
            {/* כפתור פתיחת המודל */}
            <Button style={{ marginRight: "38.5%", marginTop: "15px" }}
                onClick={() => setIsModalOpen(true)}
                variant="primary-dark"
                size="lg"
                icon={<Plus size={20} />}
                iconPosition="right"
            >
                הוספת שאלה חדשה
            </Button>

            {/* מודל הוספת שאלה */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardSimple className="m-0 border-0 shadow-none">
                            {/* כותרת המודל */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <IconWrapper color="primary-dark" size="lg">
                                        <FileQuestion size={24} />
                                    </IconWrapper>
                                    <Heading1 className="text-2xl">הוספת שאלה למאגר</Heading1>
                                </div>
                                <Button
                                    onClick={() => setIsModalOpen(false)}
                                    variant="ghost"
                                    size="sm"
                                    icon={<X size={20} />}
                                />
                            </div>

                            {/* טופס הוספת שאלה */}
                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                            value={newQuestion.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
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
                                            value={newQuestion.content}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
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
                                                    selectedCategory ? "text-gray-900" : "text-gray-500"
                                                )}>
                                                    {selectedCategory?.name || "בחר קטגוריה..."}
                                                </span>
                                            </button>

                                            {isCategoryDropdownOpen && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                                    {categories && categories.length > 0 ? (
                                                        categories.map((category: Category) => (
                                                            <button
                                                                key={category.id}
                                                                type="button"
                                                                onClick={() => handleCategorySelect(category)}
                                                                className={cn(
                                                                    "w-full px-3 py-2 text-right hover:bg-gray-100 transition-colors text-sm",
                                                                    selectedCategory?.id === category.id && "bg-blue-50 text-blue-700"
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
                                    <AddCategory/>
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
                                            value={newQuestion.tips}
                                            onChange={(e) => handleInputChange('tips', e.target.value)}
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
                                            htmlFor="aiGuidance"
                                            className="block text-sm font-semibold text-gray-700 text-right"
                                        >
                                            הוראות למערכת AI *
                                        </label>
                                        <textarea
                                            id="aiGuidance"
                                            placeholder="הכנס הוראות למערכת AI לגבי איך להעריך תשובות לשאלה זו..."
                                            value={newQuestion.ai_guidance}
                                            onChange={(e) => { handleInputChange('ai_guidance', e.target.value) }}
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
                                        onClick={() => setIsModalOpen(false)}
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
                                        icon={<Plus size={18} />}
                                        iconPosition="right"
                                    >
                                        הוסף שאלה
                                    </Button>
                                </div>
                            </form>
                        </CardSimple>
                    </div>
                </div>
            )}
        </>
    )
}
