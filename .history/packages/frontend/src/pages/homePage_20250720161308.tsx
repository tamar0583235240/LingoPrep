import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { GridContainer } from "../shared/ui/GridContainer";
import { store } from "../shared/store/store";

const HomePage = () => {
  const navigate = useNavigate();
  const isManager: boolean = store.getState().auth.isAdmin;
  console.log(store.getState().auth.user?.role);

  return (
<<<<<<< HEAD
    <div dir="rtl">
      <div>
        <div onClick={() => { navigate('/simulation') }}>
          <button>start simulation</button>
        </div>
        <div onClick={() => { navigate('/dashboard') }}>
          <button>dashboard</button>
        </div>
        <div onClick={() => { navigate('/resources') }}>
          <button>resources</button>
        </div>
        <div onClick={() => { navigate('/recordings') }}>
          <button>recordings</button>
        </div>
        <div onClick={() => { navigate('/shared') }}>
          <button>shared</button>
        </div>
        <div onClick={() => { navigate('/reminders') }}>
          <button>reminders</button>
        </div>
      </div>
      {isManager && (
        <div>
          <h2>admin</h2>
          <div onClick={() => { navigate('/admin/questions') }}>
            <button>questions</button>
          </div>
          <div onClick={() => { navigate('/admin/resources') }}>
            <button>resources</button>
          </div>
          <div onClick={() => { navigate('/admin/users') }}>
            <button>users</button>
          </div>
        </div>
      )}
    </div>
  )
}
=======
    <GridContainer maxWidth="md" gridClasses="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4" mt="mt-4" mb="mb-4">
      <Button variant="primary-dark" fullWidth onClick={() => navigate("/simulation")}>
        התחלי סימולציה
      </Button>
      <Button variant="primary-dark" fullWidth onClick={() => navigate("/dashboard")}>
        דשבורד
      </Button>
      <Button variant="primary-dark" fullWidth onClick={() => navigate("/resources")}>
        משאבים
      </Button>
      <Button variant="primary-dark" fullWidth onClick={() => navigate("/recordings")}>
        הקלטות
      </Button>
      <Button variant="primary-dark" fullWidth onClick={() => navigate("/shared")}>
        משותף
      </Button>
>>>>>>> manager-remindrs


      {isManager && (
        <>
          <div className="col-span-full mt-6 text-right">
            <h2 className="text-xl font-bold text-text-main">מנהל מערכת</h2>
          </div>
          <Button variant="outline" fullWidth onClick={() => navigate("/admin/questions")}>
            ניהול שאלות
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate("/admin/reminders")}>
            ניהול תזכורות
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
