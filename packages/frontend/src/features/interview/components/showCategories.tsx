import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../services/categoriesApi";
import { FiChevronDown } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { setCurrentCategoryId } from "../store/simulationSlice";

const CategoryDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { currentCategoryId } = useSelector((state: RootState) => state.simulation);

  useEffect(() => {
    if (currentCategoryId) {
      setSelectedCategory(currentCategoryId);
    }
  }, [currentCategoryId]);

  useEffect(() => {
    if (!currentCategoryId && categories?.length) {
      dispatch(setCurrentCategoryId(String(categories[0].id)));
    }
  }, [categories, currentCategoryId, dispatch]);

  if (isLoading) return <p className="text-gray-500">טוען קטגוריות...</p>;
  if (error) return <p className="text-red-600">שגיאה בטעינת הקטגוריות</p>;

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsOpen(false);
    dispatch(setCurrentCategoryId(categoryId));
  };

  const selectedName =
    categories?.find((c) => String(c.id) === selectedCategory)?.name || "בחר קטגוריה";

  return (
    <div className="relative w-56 text-right">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border border-gray-300 bg-white text-gray-800 px-4 py-2 rounded-md font-medium flex items-center justify-between shadow-sm hover:bg-gray-50 transition"
      >
        <span className="truncate">{selectedName}</span>
        <FiChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto animate-fade-in">
          {categories?.map((category) => (
            <li
              key={category.id}
              onClick={() => handleSelect(String(category.id))}
              className={`px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 transition 
                ${selectedCategory === String(category.id) ? "bg-primary/10 font-semibold text-primary" : ""}
              `}
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;