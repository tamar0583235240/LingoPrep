import * as React from "react";
import { cn } from "../utils/cn";
import { Input } from "./input";
import { Button } from "./button";
import { FaPlus, FaTimes } from "react-icons/fa";

export interface GenericTag {
  id: string | number;
  label: string;
  [key: string]: any; // שדות נוספים בהתאם לסוג הטאג
}

interface TagInputProps<T extends GenericTag> extends React.HTMLAttributes<HTMLDivElement> {
  selectedTags: T[];
  onTagsChange: (newTags: T[]) => void;
  placeholder?: string;
  label?: string;
  renderTagLabel?: (tag: T) => React.ReactNode; 
  getNewTagData?: (inputValue: string) => T;
  validateNewTag?: (tag: T, existingTags: T[]) => boolean;
}

export function TagInput<T extends GenericTag>({
  selectedTags,
  onTagsChange,
  placeholder = "הוסף פריט...",
  label,
  renderTagLabel,
  getNewTagData,
  validateNewTag,
  className,
  ...props
}: TagInputProps<T>) {
  const [inputValue, setInputValue] = React.useState("");

  const handleAddTag = () => {
    if (!getNewTagData) return;

    const newTag = getNewTagData(inputValue.trim());
    if (
      newTag.label !== "" &&
      (!validateNewTag || validateNewTag(newTag, selectedTags))
    ) {
      onTagsChange([...selectedTags, newTag]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (id: string | number) => {
    onTagsChange(selectedTags.filter((tag) => tag.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {label && <label className="text-sm font-medium text-text-main">{label}</label>}
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow"
        />
        <Button onClick={handleAddTag} variant="outline" size="sm" className="flex items-center gap-1">
          <FaPlus /> הוסף
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 bg-muted text-text-main text-sm font-medium px-3 py-1 rounded-full border border-border"
          >
            {renderTagLabel ? renderTagLabel(tag) : tag.label}
            <button
              onClick={() => handleRemoveTag(tag.id)}
              className="text-text-secondary hover:text-danger ml-1"
              aria-label={`הסר את ${tag.label}`}
              type="button"
            >
              <FaTimes size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
