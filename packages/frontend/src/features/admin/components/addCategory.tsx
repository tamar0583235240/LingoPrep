import { useState } from "react"
import { useAddCategoryMutation } from "../services/adminQuestionApi"
import { Input } from "../../../shared/ui/input"
import { Button } from "../../../shared/ui/button"

export const AddCategory = () => {
    const [addCategory] = useAddCategoryMutation()
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
    const [categoryName, setCategoryName] = useState("")

    const handleOpen = () => setIsAddCategoryOpen(true)
    const handleClose = () => {
        setIsAddCategoryOpen(false)
        setCategoryName("")
    }

    const handleSave = async () => {
        if (!categoryName.trim()) return

        try {
            await addCategory(categoryName).unwrap()
            handleClose()
        } catch (error) {
            console.error("שגיאה בהוספת קטגוריה:", error)
        }
    }

    return (
        <div className="mt-6">
            {!isAddCategoryOpen ? (
                <div className="flex justify-center">
                    <Button
                        type="button"
                        variant="primary-dark"
                        size="sm"
                        onClick={handleOpen}
                    >
                        הוספת קטגוריה
                    </Button>
                </div>
            ) : (
                <div className="space-y-2 mt-2">
                    <label className="block text-sm font-medium text-right">
                        שם קטגוריה חדשה
                    </label>
                    <Input
                        type="text"
                        placeholder="הכנס את שם הקטגוריה..."
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="text-right"
                    />
                    <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            ביטול
                        </Button>
                        <Button type="button" variant="primary-dark" onClick={handleSave}>
                            שמור
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
