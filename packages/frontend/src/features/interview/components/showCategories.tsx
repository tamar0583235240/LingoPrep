import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { goToQuestion, setCurrentCategoryId } from "../store/simulationSlice";
import { useGetAllCategoriesQuery } from "../services/categoriesApi";

const CategoryTabs: React.FC = () => {
  const dispatch = useDispatch();
  const { currentCategoryId } = useSelector((state: RootState) => state.simulation);
  const { data: categories = [], isLoading: isLoadingCategories } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (!currentCategoryId && categories.length > 0) {
      dispatch(setCurrentCategoryId(String(categories[0].id)));
    }
  }, [categories, currentCategoryId, dispatch]);
  return (
    <div className=" border-[--color-border] rounded-t-[2.5rem] px-4 pt-4 pb-0">
      {isLoadingCategories ? (
        <div className="px-8 py-3 text-gray-400">טוען קטגוריות...</div>
      ) : categories.length === 0 ? (
        <div className="px-8 py-3 text-gray-400">לא נמצאו קטגוריות</div>
      ) : (
        <div className="flex flex-wrap justify-start items-end gap-0">
          {categories.map((cat: any) => {
            const isSelected = currentCategoryId === String(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  dispatch(setCurrentCategoryId(String(cat.id)));
                  dispatch(goToQuestion(0));
                }}
                className={`w-28 h-12 flex items-center justify-center text-sm font-semibold transition-all duration-200 border-t border-x focus:outline-none rounded-t-[1rem] ${
  isSelected
    ? "bg-[#E6FCF7] text-[--color-primary] z-20 border-[--color-primary]"
    : "bg-[--color-background] text-[--color-secondary-text] hover:bg-white hover:text-[--color-primary] z-10 border-[--color-border] border-b"
}`}
                style={{
                  marginInlineStart: "-1px", // יוצר רצף בלי רווחים
                }}
              >
                <span className="text-center truncate">{cat.name || cat.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
