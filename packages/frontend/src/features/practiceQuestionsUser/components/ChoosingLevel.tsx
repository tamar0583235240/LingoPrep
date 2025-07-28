interface ChoosingLevelProps {
  value: string;
  onChange: (value: string) => void;
}

export const ChoosingLevel = ({ value, onChange }: ChoosingLevelProps) => {
  return (
    <div dir="rtl" className="flex flex-col items-start gap-2 w-fit">
      <label className="font-semibold text-[--color-text]">בחרי רמת קושי:</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-48 text-sm border border-gray-300 rounded-md px-3 py-2 text-right truncate
                     focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition"
        >
          <option value="">ללא</option>
          <option value="easy">קל</option>
          <option value="medium">בינוני</option>
          <option value="hard">קשה</option>
        </select>
      </div>
    </div>
  );
};
