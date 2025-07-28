import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { GridContainer } from "../shared/ui/GridContainer";
// ייבוא דמה - תחליף את זה ברכיבים האמיתיים שלך
// import SidebarNavigation from "../components/SidebarNavigation";
import SidebarNavigation from "../shared/ui/sidebar";
import { Heading1, Paragraph } from "../shared/ui/typography";
// import { ArrowLeft } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";

import { store } from "../shared/store/store";

const HomePage = () => {
    console.log("HomePage rendered");
  const navigate = useNavigate();
  const isManager: boolean = store.getState().auth.isAdmin;
  console.log(store.getState().auth.user?.role);

  return (
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
            <Paragraph className="text-gray-700 text-lg leading-relaxed">
              Lingo-Prep היא מערכת חדשנית וידידותית לתרגול ראיונות עבודה.
              באמצעות סימולציות קוליות, טיפים מותאמים אישית וניתוח מבוסס AI,
              תוכלי לתרגל את התשובות, להבין איפה לשפר, ולעקוב אחרי ההתקדמות שלך – בקצב שלך, ובצורה אישית ומחזקת.
            </Paragraph>
            <div className="flex gap-4 justify-start mt-4">
              <Button
                variant="primary-dark"
                className="px-6 py-3 text-lg flex gap-2"
                onClick={() => navigate("/simulation")}
              >
                התחלת סימולציה
                {/* <ArrowLeft className="w-5 h-5" /> */}
                <FiArrowLeft className="w-5 h-5" />

              </Button>
            </div>
          </div>

          <img
            src="/landingPageImages/1.jpg"
            alt="משרד מודרני"
            className="w-full max-w-md rounded-xl shadow-md"
          />
        </div>

        <GridContainer maxWidth="lg" mt="mt-8" mb="mb-8" className="min-h-screen px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center mb-10 col-span-full">
            <Heading1 className="mb-2">הכלים שלך להצלחה</Heading1>
            <Paragraph className="text-lg">
              פיתחנו עבורך סט כלים ייחודי שנועד לתת לך יתרון משמעותי בתהליך חיפוש העבודה.
            </Paragraph>
            
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
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate("/auto-delete-config")}
          >
            ניהול הקלטות
          </Button>


        </GridContainer>
      </div>
    </div>
  );
};

export default HomePage;
