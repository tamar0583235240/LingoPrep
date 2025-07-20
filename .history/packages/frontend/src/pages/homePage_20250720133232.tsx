import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { GridContainer } from "../shared/ui/GridContainer";
import { store } from "../shared/store/store";

const HomePage = () => {
  const navigate = useNavigate();
  const isManager: boolean = store.getState().auth.isAdmin;
  console.log(store.getState().auth.user?.role);

  return (
   
    // </GridContainer>
    <div className="flex h-screen">
      <SidebarNavigation />

      <div className="flex-1 mr-64">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[--color-bg] p-6 md:p-20 gap-8">
          <div className="text-right max-w-xl space-y-6">
            <Heading1>
              הדרך הבטוחה <br /> שלך לראיון <br />
              עבודה מוצלח
            </Heading1>
            <p className="text-gray-700 text-lg leading-relaxed">
              Lingo-Prep היא מערכת חדשנית וידידותית לתרגול ראיונות עבודה.
              באמצעות סימולציות קוליות, טיפים מותאמים אישית וניתוח מבוסס AI,
              תוכלי לתרגל את התשובות, להבין איפה לשפר, ולעקוב אחרי ההתקדמות שלך – בקצב שלך, ובצורה אישית ומחזקת.
            </p>
            <div className="flex gap-4 justify-start mt-4">
              <Button variant="primary-dark" className="px-6 py-3 text-lg flex gap-2" onClick={() => navigate("/simulation")}>
                התחלת סימולציה
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Button variant="outline" fullWidth onClick={() => navigate("/admin/questions")}>
            ניהול שאלות
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate("/admin/resources")}>
            ניהול משאבים
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate("/admin/users")}>
            ניהול משתמשים
          </Button>
              <Button variant="outline" fullWidth onClick={() => navigate("/admin/dynamic-content")}>
      ניהול תכנים דינמיים
    </Button>
        </>

        
      )}
    </GridContainer>

  );
};

export default HomePage;
