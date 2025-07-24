import { useDeleteQuestionByIdMutation } from "../services/adminQuestionApi";
import { useMessageModal } from "../../../shared/ui/MessageModalContext";
import { Button } from "../../../shared/ui/button";

type DeleteQuestionProps = {
    id: string;
    onClose: () => void;
};

export const DeleteQuestion: React.FC<DeleteQuestionProps> = ({ id, onClose }) => {
    const [deleteQuestion, { isLoading }] = useDeleteQuestionByIdMutation();
    const { showMessage } = useMessageModal();

    const handleDelete = async () => {
        try {
            await deleteQuestion(id);
            showMessage("הצלחה", "השאלה נמחקה בהצלחה");
            onClose();
        } catch (error: any) {
            if( error?.status === 404 ) 
                showMessage("שגיאה", `אירעה שגיאה במחיקת השאלה: ${error?.data?.message || error?.message || 'שגיאה לא ידועה'}`);    
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-card w-full max-w-md text-right" dir="rtl">
                <h2 className="text-lg font-bold text-gray-900 mb-4">מחיקת שאלה</h2>
                <p className="text-gray-600 mb-6">האם אתה בטוח שברצונך למחוק את השאלה? פעולה זו לא ניתנת לביטול.</p>

                <div className="flex gap-3 justify-end">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        ביטול
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        isLoading={isLoading}
                    >
                        מחק
                    </Button>
                </div>
            </div>
        </div>
    );
};
