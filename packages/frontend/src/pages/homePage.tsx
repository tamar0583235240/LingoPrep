// import { useNavigate } from "react-router-dom";
// import { Button } from "../shared/ui/button";
// import { GridContainer } from "../shared/ui/GridContainer";
// import { store } from "../shared/store/store";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const isManager: boolean = store.getState().auth.isAdmin;
//   console.log(store.getState().auth.user?.role);


//   return (
//     <GridContainer maxWidth="md" gridClasses="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4" mt="mt-4" mb="mb-4">
//       <Button variant="primary-dark" fullWidth onClick={() => navigate("/simulation")}>
//         התחלי סימולציה
//       </Button>
//       <Button variant="primary-dark" fullWidth onClick={() => navigate("/dashboard")}>
//         דשבורד
//       </Button>
//       <Button variant="primary-dark" fullWidth onClick={() => navigate("/resources")}>
//         משאבים
//       </Button>
//       <Button variant="primary-dark" fullWidth onClick={() => navigate("/recordings")}>
//         הקלטות
//       </Button>
//       <Button variant="primary-dark" fullWidth onClick={() => navigate("/shared")}>
//         משותף
//       </Button>


//       {isManager && (
//         <>
//           <div className="col-span-full mt-6 text-right">
//             <h2 className="text-xl font-bold text-text-main">מנהל מערכת</h2>
//           </div>
//           <Button variant="outline" fullWidth onClick={() => navigate("/admin/questions")}>
//             ניהול שאלות
//           </Button>
//           <Button variant="outline" fullWidth onClick={() => navigate("/admin/resources")}>
//             ניהול משאבים
//           </Button>
//           <Button variant="outline" fullWidth onClick={() => navigate("/admin/users")}>
//             ניהול משתמשים
//           </Button>
//         </>
//       )}
//     </GridContainer>
//     // <GridContainer maxWidth="lg" mt="mt-8" mb="mb-16">
//     //   <Heading1 className="mb-2">ברוכה הבאה!</Heading1>
//     //   <Paragraph className="mb-6">
//     //     כאן תוכלי למצוא את כל הכלים שלך להתכונן לראיונות
//     //   </Paragraph>

//     //   <Grid cols={2} className="mb-10">
//     //     <Card
//     //       title="מדריך כתיבת קורות חיים"
//     //       category="קורות חיים"
//     //       description="טיפים מקצועיים שיתנו לך יתרון בגיוס"
//     //     />
//     //     <Card
//     //       title="איך להתלבש לראיון"
//     //       category="הופעה חיצונית"
//     //       description="מדריך קצר לבחירת לבוש לראיון"
//     //     />
//     //   </Grid>

//     //   <Grid cols={3} className="mb-10">
//     //     <SummaryBox
//     //       title="ציון ממוצע"
//     //       value="4.1 / 5.0"
//     //       description={<div className="text-yellow-400 text-lg">★★★★☆</div>}
//     //       icon={<Star />}
//     //       iconColor="accent"
//     //     />
//     //     <SummaryBox
//     //       title="התקדמות כללית"
//     //       value="7 / 14"
//     //       description={
//     //         <div className="w-full h-2 bg-muted rounded">
//     //           <div
//     //             className="h-full bg-primary-dark rounded"
//     //             style={{ width: "50%" }}
//     //           />
//     //         </div>
//     //       }
//     //       icon={<CircleGauge />}
//     //       iconColor="secondary"
//     //     />
//     //     <SummaryBox
//     //       title="סה״כ הקלטות"
//     //       value="17"
//     //       description="תרגולים שבוצעו"
//     //       icon={<Mic />}
//     //       iconColor="primary-dark"
//     //     />
//     //   </Grid>

//     //   {/* <Button onClick={() => showMessage("שלום!")}>
//     //     הצג הודעה
//     //   </Button> */}
//     // </GridContainer>
//   );
// };

// export default HomePage;


import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { GridContainer } from "../shared/ui/GridContainer";
import { store } from "../shared/store/store";
import { UserStats } from "../shared/components/UserStats";

const HomePage = () => {
  const navigate = useNavigate();
  const isManager: boolean = store.getState().auth.isAdmin;
  console.log(store.getState().auth.user?.role);

  return (
    <>
      <GridContainer
        maxWidth="md"
        gridClasses="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4"
        mt="mt-4"
        mb="mb-4"
      >
        <Button
          variant="primary-dark"
          fullWidth
          onClick={() => navigate("/simulation")}
        >
          התחלי סימולציה
        </Button>
        <Button
          variant="primary-dark"
          fullWidth
          onClick={() => navigate("/dashboard")}
        >
          דשבורד
        </Button>
        <Button
          variant="primary-dark"
          fullWidth
          onClick={() => navigate("/resources")}
        >
          משאבים
        </Button>
        <Button
          variant="primary-dark"
          fullWidth
          onClick={() => navigate("/recordings")}
        >
          הקלטות
        </Button>
        <Button
          variant="primary-dark"
          fullWidth
          onClick={() => navigate("/shared")}
        >
          משותף
        </Button>

        {/* כפתור ניווט ל־WeeklyStats */}
        <Button
          variant="primary-dark"
          fullWidth
          onClick={() => navigate("/weekly-stats")}
        >
          Weekly Stats
        </Button>

        {isManager && (
          <>
            <div className="col-span-full mt-6 text-right">
              <h2 className="text-xl font-bold text-text-main">מנהל מערכת</h2>
            </div>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate("/admin/questions")}
            >
              ניהול שאלות
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate("/admin/resources")}
            >
              ניהול משאבים
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate("/admin/users")}
            >
              ניהול משתמשים
            </Button>
          </>
        )}
      </GridContainer>

      {/* הצגת קומפוננטת WeeklyStats מתחת לכפתורים
      <div className="mt-8 max-w-md mx-auto">
        <WeeklyStats />
      </div> */}
    </>
  );
};

export default HomePage;
