// components/common/EditableListItem.tsx
import * as React from "react";
import { cn } from "../utils/cn";
import { CardSimple } from "./card"; 
import { Button } from "./button"; 
import { Input } from "./input"; 
import { ToggleSwitch } from "./ToggleSwitch"; 
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa"; 

interface EditableListItemProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  itemData: T; 
  isEditing: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onSave: (id: string | number, updatedData: T) => void;
  onCancelEdit: () => void;
  onToggleVisibility: (id: string | number, isVisible: boolean) => void;
  isPubliclyVisible: boolean;
  renderDisplay: (data: T) => React.ReactNode; 
  renderEditForm: (data: T, onChange: (key: keyof T, value: any) => void) => React.ReactNode; 
  itemIdKey?: keyof T;
}

export function EditableListItem<T extends { id?: string | number }>({
  itemData,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancelEdit,
  onToggleVisibility,
  isPubliclyVisible,
  renderDisplay,
  renderEditForm,
  itemIdKey = 'id' as keyof T,
  className,
  ...props
}: EditableListItemProps<T>) {
  const [editedData, setEditedData] = React.useState<T>(itemData);

  React.useEffect(() => {
    setEditedData(itemData); // עדכן את ה-state כאשר itemData משתנה מבחוץ
  }, [itemData]);

  const handleInputChange = (key: keyof T, value: any) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  const itemId = itemData[itemIdKey] as string | number;

  return (
    <CardSimple
      className={cn(
        "relative flex flex-col gap-4",
        isEditing ? "p-6" : "p-4",
        className
      )}
      {...props}
    >
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <ToggleSwitch
          checked={isPubliclyVisible}
          onToggle={() => onToggleVisibility(itemId, !isPubliclyVisible)}
          label={isPubliclyVisible ? "מוצג לציבור" : "פרטי"}
        />
        {!isPubliclyVisible && (
          <span className="text-xs text-text-secondary">
            (לא יוצג בפרופיל הציבורי)
          </span>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="primary-dark" onClick={() => onSave(itemId, editedData)}>
             {FaSave && <FaSave />}שמור
            </Button>
            <Button size="sm" variant="outline" onClick={onCancelEdit}>
              <FaTimes /> בטל
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="ghost" onClick={() => onEdit(itemId)} aria-label="ערוך">
              <FaEdit />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(itemId)} aria-label="מחק">
              <FaTrashAlt />
            </Button>
          </>
        )}
      </div>

      <div className="mt-8"> 
        {isEditing ? renderEditForm(editedData, handleInputChange) : renderDisplay(itemData)}
      </div>
    </CardSimple>
  );
}

EditableListItem.displayName = "EditableListItem";
// import * as React from "react";
// import { cn } from "../utils/cn";
// import { CardSimple } from "./card";
// import { Button } from "./button";
// import { ToggleSwitch } from "./ToggleSwitch";
// import { FaEdit, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";

// interface EditableListItemProps<T extends { id: string | number }> extends React.HTMLAttributes<HTMLDivElement> {
//   itemData: T;
//   isEditing: boolean;
//   isPubliclyVisible: boolean;
//   onEdit: (id: string | number) => void;
//   onDelete: (id: string | number) => void;
//   onSave: (id: string | number, updatedData: T) => void;
//   onCancelEdit: () => void;
//   onToggleVisibility: (id: string | number, isVisible: boolean) => void;
//   renderDisplay: (data: T) => React.ReactNode;
//   renderEditForm: <K extends keyof T>(data: T, onChange: (key: K, value: T[K]) => void) => React.ReactNode;
// }

// export function EditableListItem<T extends { id: string | number }>({
//   itemData,
//   isEditing,
//   isPubliclyVisible,
//   onEdit,
//   onDelete,
//   onSave,
//   onCancelEdit,
//   onToggleVisibility,
//   renderDisplay,
//   renderEditForm,
//   className,
//   ...props
// }: EditableListItemProps<T>) {
//   const [editedData, setEditedData] = React.useState<T>(itemData);

//   React.useEffect(() => {
//     setEditedData(itemData);
//   }, [itemData]);

//   const handleInputChange = React.useCallback(
//     <K extends keyof T>(key: K, value: T[K]) => {
//       setEditedData((prev) => ({ ...prev, [key]: value }));
//     },
//     []
//   );

//   const itemId = itemData.id;
//   const isDirty = JSON.stringify(itemData) !== JSON.stringify(editedData);

//   return (
//     <CardSimple
//       className={cn(
//         "relative flex flex-col gap-4 transition-all duration-300",
//         isEditing ? "p-6 border border-primary bg-muted/50" : "p-4",
//         className
//       )}
//       {...props}
//     >
//       <div className="absolute top-4 left-4 flex items-center gap-2">
//         <ToggleSwitch
//           checked={isPubliclyVisible}
//           onToggle={() => onToggleVisibility(itemId, !isPubliclyVisible)}
//           label={isPubliclyVisible ? "מוצג לציבור" : "פרטי"}
//         />
//         {!isPubliclyVisible && (
//           <span className="text-xs text-text-secondary">
//             (לא יוצג בפרופיל הציבורי)
//           </span>
//         )}
//       </div>

//       <div className="flex justify-end gap-2">
//         {isEditing ? (
//           <>
//             <Button
//               size="sm"
//               variant="primary-dark"
//               onClick={() => onSave(itemId, editedData)}
//               disabled={!isDirty}
//               aria-label="שמור"
//             >
//               <FaSave className="me-1" /> שמור
//             </Button>
//             <Button size="sm" variant="outline" onClick={onCancelEdit} aria-label="בטל">
//               <FaTimes className="me-1" /> בטל
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button size="sm" variant="ghost" onClick={() => onEdit(itemId)} aria-label="ערוך">
//               <FaEdit />
//             </Button>
//             <Button size="sm" variant="ghost" onClick={() => onDelete(itemId)} aria-label="מחק">
//               <FaTrashAlt />
//             </Button>
//           </>
//         )}
//       </div>

//       <div className="mt-8">
//         {isEditing
//           ? renderEditForm(editedData, handleInputChange)
//           : renderDisplay(itemData)}
//       </div>
//     </CardSimple>
//   );
// }

// EditableListItem.displayName = "EditableListItem";
