import React, { useState, useEffect } from "react";
import {
  useGetInterviewMaterialsQuery,
  useDeleteInterviewMaterialMutation,
} from "../../../shared/api/interviewMaterialsApi";

import { InterviewMaterial } from "../types/InterviewMaterials";

import MessageModal from "../../../shared/ui/messageModal";
import { InterviewMaterialsItem } from "./interviewMaterialsItem";
import { EditInterviewMaterialsForm } from "./EditInterviewMaterialsForm";
// import { EditInterviewMaterialsForm } from "./EditInterviewMaterialsForm";

export const InterviewMaterialsList = () => {
  const { data: items, error, isLoading } = useGetInterviewMaterialsQuery();
  const [deleteMaterial] = useDeleteInterviewMaterialMutation();

  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<InterviewMaterial | null>(null);

  const handleDeleteClick = (id: string) => setConfirmingId(id);
  const handleCancelDelete = () => setConfirmingId(null);

  const handleConfirmDelete = async () => {
    if (!confirmingId) return;
    try {
      await deleteMaterial(confirmingId).unwrap();
    } catch (e) {
      console.error("Failed to delete:", e);
    } finally {
      setConfirmingId(null);
    }
  };

  const handleEdit = (item: InterviewMaterial) => {
    setEditingItem(item);
  };

  useEffect(() => {
    document.body.style.overflow = editingItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [editingItem]);

  if (isLoading)
    return (
      <p className="text-center py-8 text-lg text-gray-500" dir="rtl">
        טוען...
      </p>
    );

  if (error)
    return (
      <p className="text-center py-8 text-lg text-red-600 font-semibold" dir="rtl">
        שגיאה בטעינת המשאבים.
      </p>
    );

  return (
    <>
      <section dir="rtl" className="mt-6 space-y-4 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
          רשימת משאבים לראיונות
        </h2>

        {items && items.length > 0 ? (
          items.map((item) => (
            <InterviewMaterialsItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">אין משאבים להצגה כרגע.</p>
        )}
      </section>

      {confirmingId && (
        <MessageModal
          title="אישור מחיקה"
          message={
            <div>
              <p>בטוחה שברצונך למחוק את הפריט הזה?</p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  מחק
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  ביטול
                </button>
              </div>
            </div>
          }
          onClose={handleCancelDelete}
        />
      )}

      {editingItem && (
        <MessageModal
          title="עריכת משאב"
          message={
            <EditInterviewMaterialsForm
              id={editingItem.id}
              defaultValues={{
                title: editingItem.title,
                shortDescription: editingItem.short_description || "",
              }}
              fileUrl={editingItem.file_url}
              thumbnail={editingItem.thumbnail}
              onSuccess={() => setEditingItem(null)}
              onCancel={() => setEditingItem(null)}
            />
          }
          onClose={() => setEditingItem(null)}
        />
      )}
    </>
  );
};

export default InterviewMaterialsList;