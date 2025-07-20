import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../services/categoriesApi";
import { FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { useDispatch } from "react-redux";
import { setCurrentCategoryId } from "../store/simulationSlice";

const CategoryDropdown: React.FC = () => {

  const dispatch = useDispatch();
  
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const{ currentCategoryId } = useSelector((state: RootState) => state.simulation)

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
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border border-border bg-white text-text-main px-4 py-3 rounded-lg font-semibold flex items-center justify-between hover:bg-muted transition"
      >
        {selectedName}
        <FiChevronDown className={`transform transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-2 w-full bg-white border border-border rounded-lg shadow-md max-h-64 overflow-y-auto">
          {categories?.map((category) => (
            <li
              key={category.id}
              onClick={() => handleSelect(String(category.id))}
              className={`px-4 py-2 cursor-pointer hover:bg-muted transition ${
                selectedCategory === String(category.id) ? "bg-primary-light font-bold" : ""
              }`}
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
