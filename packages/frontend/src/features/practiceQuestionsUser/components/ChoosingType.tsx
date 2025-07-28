interface ChoosingTypeProps {
  value: string;
  onChange: (value: string) => void;
}

export const ChoosingType = ({ value, onChange }: ChoosingTypeProps) => {
  return (
    <div dir="rtl" className="flex flex-col items-start gap-2 w-fit">
      <label className="font-semibold text-[--color-text]">בחרי סוג שאלה:</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-48 text-sm border border-gray-300 rounded-md px-3 py-2 text-right truncate
                     focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition"
        >
          <option value="">ללא</option>
          <option value="yes_no">כן / לא</option>
          <option value="free_text">טקסט חופשי</option>
          <option value="code">קוד</option>
        </select>
      </div>
    </div>
  );
};
