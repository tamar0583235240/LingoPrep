import * as React from "react";
import { EditableListItem } from "../../../shared/ui/EditableListItem";
import { Heading2 } from "../../../shared/ui/typography";
import { Input } from "../../../shared/ui/input";
import {
  useGetWorkExperiencesQuery,
  useCreateWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
} from "../services/workExperienceApi";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
// import { IconButton } from "../../../shared/ui/IconButon";

export interface WorkExperienceItem {
  id: string;
  company_name: string;
  position: string;
  description?: string;
  start_date: string;
  end_date?: string | null;
  is_public: boolean;
}

export const WorkExperienceTab = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const {
    data = [],
    refetch,
    error,
    isLoading,
  } = useGetWorkExperiencesQuery(userId!, {
    skip: !userId,
  });

  const [create] = useCreateWorkExperienceMutation();
  const [update] = useUpdateWorkExperienceMutation();
  const [remove] = useDeleteWorkExperienceMutation();

  const [editingId, setEditingId] = React.useState<string | null>(null);

  const handleSave = async (id: string, updated: WorkExperienceItem) => {
    try {
const payload = {
  user_id: userId,
  companyName: updated.company_name,
  position: updated.position,
  description: updated.description || "",
  startDate: updated.start_date,
  endDate: updated.end_date?.trim() === "" ? null : updated.end_date,
  isPublic: updated.is_public ?? false,
};
      if (id === "new") {
        console.log("payload:", payload);
        await create(payload).unwrap();
      } else {
        await update({ id, ...payload }).unwrap();
      }
      setEditingId(null);
      refetch();
    } catch (err) {
      console.error("Failed saving work experience:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed deleting work experience:", err);
    }
  };

  const handleToggleVisibility = async (id: string | number) => {
    const item = data.find((x: WorkExperienceItem) => x.id === id);
    if (!item || !userId) return;

    const payload = {
      id: String(item.id),
      user_id: userId,
      company_name: item.company_name,
      position: item.position,
      description: item.description || "",
      start_date: item.start_date,
      end_date: item.end_date || null,
      is_public: !item.is_public,
    };

    try {
      await update(payload).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed toggling visibility:", err);
    }
  };

  return (
    <GridContainer maxWidth="sm" padding="px-4" mt="mt-10" mb="mb-10">
      <div className="space-y-4 w-full">

        {data.map((item: WorkExperienceItem) => (
          <EditableListItem<WorkExperienceItem>
            key={item.id}
            itemData={item}
            isEditing={editingId === item.id}
            onEdit={() => setEditingId(item.id)}
            onCancelEdit={() => setEditingId(null)}
            onSave={(id, updated) => void handleSave(String(id), updated)}
            onDelete={(id) => void handleDelete(String(id))}
            onToggleVisibility={(id) => handleToggleVisibility(id)}
            isPubliclyVisible={item.is_public}
            renderDisplay={(data) => (
              <div>
                <div className="font-semibold">
                  {data.company_name} – {data.position}
                </div>
                <div className="text-sm text-text-secondary">
                 {"מ-"} {data.start_date ? new Date(data.start_date).toLocaleDateString() : "לא ידוע"} עד{" "}
                  {data.end_date ? new Date(data.end_date).toLocaleDateString() : "היום"}
                </div>
                <p className="mt-1">{data.description}</p>
              </div>
            )}
            renderEditForm={(data, onChange) => (
              <div className="space-y-2">
                <Input
                  value={data.company_name}
                  onChange={(e) => onChange("company_name", e.target.value)}
                  placeholder="שם מקום עבודה"
                />
                <Input
                  value={data.position}
                  onChange={(e) => onChange("position", e.target.value)}
                  placeholder="תפקיד"
                />
                <textarea
                  value={data.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  placeholder="תיאור התפקיד"
                  className="border rounded p-2 w-full"
                />
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={data.start_date}
                    onChange={(e) => onChange("start_date", e.target.value)}
                  />
                  <Input
                    type="date"
                    value={data.end_date ?? ""}
                    onChange={(e) => onChange("end_date", e.target.value)}
                  />
                </div>
              </div>
            )}
          />
        ))}

        {editingId !== "new" && (
          <button
            onClick={() => setEditingId("new")}
            className="text-sm text-primary hover:underline"
          >
            + הוספת מקום עבודה חדש
          </button>
        )}

        {editingId === "new" && (
          <EditableListItem<WorkExperienceItem>
            itemData={{
              id: "new",
              company_name: "",
              position: "",
              description: "",
              start_date: "",
              end_date: "",
              is_public: true,
            }}
            isEditing={true}
            onEdit={() => {}}
            onCancelEdit={() => setEditingId(null)}
            onSave={(id, updated) => void handleSave(String(id), updated)}
            onDelete={() => setEditingId(null)}
            onToggleVisibility={() => {}}
            isPubliclyVisible={true}
            renderDisplay={() => null}
            renderEditForm={(data, onChange) => (
              <div className="space-y-2">
                <Input
                  value={data.company_name}
                  onChange={(e) => onChange("company_name", e.target.value)}
                  placeholder="שם מקום עבודה"
                />
                <Input
                  value={data.position}
                  onChange={(e) => onChange("position", e.target.value)}
                  placeholder="תפקיד"
                />
                <textarea
                  value={data.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  placeholder="תיאור התפקיד"
                  className="border rounded p-2 w-full"
                />
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={data.start_date}
                    onChange={(e) => onChange("start_date", e.target.value)}
                  />
                  <Input
                    type="date"
                    value={data.end_date ?? ""}
                    onChange={(e) => onChange("end_date", e.target.value)}
                  />
                </div>
              </div>
            )}
          />
        )}
      </div>
    </GridContainer>
  );
};
