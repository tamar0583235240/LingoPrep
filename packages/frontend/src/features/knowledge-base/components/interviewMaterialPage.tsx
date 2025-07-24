import { useState } from "react";
import { CreateInterviewMaterialsForm } from "./CreateInterviewMaterialsForm";
import MessageModal from "../../../shared/ui/messageModal";
import { Button } from "../../../shared/ui/button";
import { Plus } from "lucide-react";
import { useCreateInterviewMaterialMutation } from "../../../shared/api/interviewMaterialsApi";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { InterviewMaterialsList } from "./InterviewMaterialsList";

const InterviewMaterialPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createResource, { isLoading, isSuccess, isError, error }] =
    useCreateInterviewMaterialMutation();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      await createResource(formData).unwrap();
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={handleOpenModal}
          variant="primary-dark"
          size="md"
          icon={<Plus size={18} />}
          iconPosition="left"
          className="mb-4"
        >
          הוסף פריט
        </Button>
      </div>
      {isModalOpen && (
        <MessageModal
          title="הוספת פריט"
          message={
            <CreateInterviewMaterialsForm
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          }
          onClose={handleCloseModal}
        />
      )}

      <InterviewMaterialsList />
    </>
  );
};

export default InterviewMaterialPage;
