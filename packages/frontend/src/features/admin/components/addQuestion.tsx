import { useState } from "react"
import { Button } from "../../../shared/ui/button"
import { Input } from "../../../shared/ui/input"
import { CardSimple } from "../../../shared/ui/card"
import { GridContainer } from "../../../shared/ui/GridContainer"
import { Heading1 } from "../../../shared/ui/typography"
import { IconWrapper } from "../../../shared/ui/IconWrapper"
import { useMessageModal } from "../../../shared/ui/MessageModalContext"
import { Plus, X, FileQuestion } from "lucide-react"
import { cn } from "../../../shared/utils/cn"
import { useAddQuestionMutation } from "../services/adminQuestionApi"

export const AddQuestion = () => {
    const [addQuestion, { isLoading, isSuccess, isError, error }] = useAddQuestionMutation()
    const { showMessage } = useMessageModal()
    
    const [newQuestion, setNewQuestion] = useState({
        id: "00000000-0000-0000-0000-000000000000",
        title: "",
        content: "",
        category: "",
        tips: "",
        aiGuidance: "",
        isActive:true,
        ai_guidance: "",
        is_active:true
    })

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            console.log(newQuestion);
            await addQuestion(newQuestion).unwrap()
            showMessage("הצלחה!", "השאלה נוספה בהצלחה למאגר השאלות")
            setNewQuestion({
                id: "00000000-0000-0000-0000-000000000000",
                title: "",
                content: "",
                category: "",
                tips: "",
                aiGuidance: "",
                isActive:true,
                ai_guidance: "",
                is_active:true
            })
            setIsModalOpen(false)
        } catch (err) {
            showMessage("שגיאה", `שגיאה בהוספת השאלה: ${err}`)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setNewQuestion(prev => ({ ...prev, [field]: value }))
    }

    return (
        <>
            {/* כפתור פתיחת המודל */}
            <Button style={{ marginRight: "38.5%" , marginTop: "15px" }}
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
                                    <div className="space-y-2">
                                        <label 
                                            htmlFor="category" 
                                            className="block text-sm font-semibold text-gray-700 text-right"
                                        >
                                            קטגוריה *
                                        </label>
                                        <Input
                                            id="category"
                                            type="text"
                                            placeholder="לדוגמה: טכנולוגיה, ניהול, מכירות..."
                                            value={newQuestion.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            required
                                            className="text-right"
                                        />
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
                                            value={newQuestion.aiGuidance}
                                            onChange={(e) => {handleInputChange('aiGuidance', e.target.value);handleInputChange('ai_guidance', e.target.value)}}
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
