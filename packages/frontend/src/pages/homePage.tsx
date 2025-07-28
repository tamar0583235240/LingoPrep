import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { GridContainer } from "../shared/ui/GridContainer";
import { store } from "../shared/store/store";
import SidebarNavigation from "../shared/ui/sidebar";
import { Grid } from "../shared/ui/grid";
import { SummaryBox } from "../shared/ui/SummaryBox";
import { Heading1, Paragraph } from "../shared/ui/typography";
import { ArrowLeft, Video, Brain, TrendingUp } from "lucide-react";

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

          <img
            src="\landingPageImages\1.jpg"
            alt="משרד מודרני"
            className="w-full max-w-md rounded-xl shadow-md"
          />

        </div>
        <GridContainer maxWidth="lg" mt="mt-8" mb="mb-8" className="min-h-screen px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center mb-10">
            <Heading1 className="mb-2">הכלים שלך להצלחה</Heading1>
            <Paragraph className="text-lg">
              פיתחנו עבורך סט כלים ייחודי שנועד לתת לך יתרון משמעותי בתהליך חיפוש העבודה.
            </Paragraph>
          </div>
          <Grid cols={3}>
            <SummaryBox
              title="מעקב התקדמות"
              value=""
              description="צפו בהתקדמות שלכם וזו נקודות לשיפור בעזרת דשבורד חכם."
              icon={<TrendingUp />}
              iconColor="secondary"
            />
            <SummaryBox
              title="ניתוח AI חכם"
              value=""
              description="קבלו משוב מידי ומפורט על התשובות שלכם מבינה מלאכותית."
              icon={<Brain />}
              iconColor="accent"
            />
            <SummaryBox
              title="סימולציות מציאותיות"
              value=""
              description="תרגלו תשובות לשאלות ראיון נפוצות בסביבה מציאותית."
              icon={<Video />}
              iconColor="primary-dark"
            />
          </Grid>
        </GridContainer>
      </div>
    </div>
  );
};

export default HomePage;
