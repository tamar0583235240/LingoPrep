import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EditableListItem } from "../../../shared/ui/EditableListItem";
import { Input } from "../../../shared/ui/input";
import { GridContainer } from "../../../shared/ui/GridContainer";
import {
  useGetExpertiseSkillsQuery,
  useCreateExpertiseSkillMutation,
  useUpdateExpertiseSkillMutation,
  useDeleteExpertiseSkillMutation
} from "../../../shared/api/expertiseSkillsApi";
import { RootState } from "../../../shared/store/store";

export interface ExpertiseSkillItem {
  id: number | string;
  category: string;
  name: string;
  level?: string;
}

export const ExpertiseSkillsList = () => {
  const user_id = useSelector((state: RootState) => state.auth.user?.id);

  const { data = [], refetch } = useGetExpertiseSkillsQuery(user_id!, {
    skip: !user_id,
  });

  const [create] = useCreateExpertiseSkillMutation();
  const [update] = useUpdateExpertiseSkillMutation();
  const [remove] = useDeleteExpertiseSkillMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = async (id: string, updated: ExpertiseSkillItem) => {
    const payload = {
      user_id: user_id!,
      category: updated.category,
      name: updated.name,
      level: updated.level || "",
    };

    try {
      if (id === "new") {
        await create(payload).unwrap();
      } else {
        await update({ id: Number(id), ...payload }).unwrap();
      }
      setEditingId(null);
      refetch();
    } catch (err) {
      console.error("שגיאה בשמירה:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!user_id) return;
      await remove({ user_id, id: Number(id) }).unwrap();
      refetch();
    } catch (err) {
      console.error("שגיאה במחיקה:", err);
    }
  };

  return (
    <GridContainer maxWidth="sm" padding="px-4" mt="mt-10" mb="mb-10">
      <div className="space-y-4 w-full">
        {data.map((item: ExpertiseSkillItem) => (
          <EditableListItem<ExpertiseSkillItem>
            key={item.id}
            itemData={item}
            isEditing={editingId === String(item.id)}
            onEdit={() => setEditingId(String(item.id))}
            onCancelEdit={() => setEditingId(null)}
            onSave={(id, updated) => void handleSave(String(id), updated)}
            onDelete={(id) => void handleDelete(String(id))}
            showToggle={false}
            renderDisplay={(data) => (
              <div>
                <div className="font-semibold">
                  {data.name} ({data.category})
                </div>
                <div className="text-sm text-text-secondary">
                  רמה: {data.level || "ללא"}
                </div>
              </div>
            )}
            renderEditForm={(data, onChange) => (
              <div className="space-y-2">
                <Input
                  value={data.category}
                  onChange={(e) => onChange("category", e.target.value)}
                  placeholder="קטגוריה"
                />
                <Input
                  value={data.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  placeholder="שם כישור"
                />
                <Input
                  value={data.level}
                  onChange={(e) => onChange("level", e.target.value)}
                  placeholder="רמה (לא חובה)"
                />
              </div>
            )}
          />
        ))}

        {editingId !== "new" && (
          <button
            onClick={() => setEditingId("new")}
            className="text-sm text-primary hover:underline"
          >
            + הוסף כישור חדש
          </button>
        )}

        {editingId === "new" && (
          <EditableListItem<ExpertiseSkillItem>
            itemData={{
              id: "new",
              category: "",
              name: "",
              level: "",
            }}
            showToggle={false}
            isEditing={true}
            onEdit={() => {}}
            onCancelEdit={() => setEditingId(null)}
            onSave={(id, updated) => void handleSave(String(id), updated)}
            onDelete={() => setEditingId(null)}
            renderDisplay={() => null}
            renderEditForm={(data, onChange) => (
              <div className="space-y-2">
                <Input
                  value={data.category}
                  onChange={(e) => onChange("category", e.target.value)}
                  placeholder="קטגוריה"
                />
                <Input
                  value={data.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  placeholder="שם כישור"
                />
                <Input
                  value={data.level}
                  onChange={(e) => onChange("level", e.target.value)}
                  placeholder="רמה (לא חובה)"
                />
              </div>
            )}
          />
        )}
      </div>
    </GridContainer>
  );
};

export default ExpertiseSkillsList;