import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../shared/ui/button"; 
import { FaHome } from "react-icons/fa";
const HomeButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/home") return null;

  return (
    <Button
      onClick={() => navigate("/home")}
      className="flex items-center text-[--color-primary] border border-[--color-primary] bg-transparent hover:bg-[--color-surface] hover:text-[--color-primary-dark] transition rounded-full p-2"
    >
      <FaHome size={24} />
    </Button>
  );
};

export default HomeButton;
