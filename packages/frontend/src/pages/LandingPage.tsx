import { useEffect, useState, useRef } from "react";
import { Button } from "../shared/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { Heading1, Paragraph } from "../shared/ui/typography";
import { useSelector } from "react-redux";
import { RootState } from "../shared/store/store";

const slides = [
  {
    image: "/landingPageImages/1.jpg",
    title: "תתכונני. תתנסי. תצליחי.",
    desc: "מערכת חכמה להכנה אישית לראיון עבודה.",
  },
  {
    image: "/landingPageImages/2.jpg",
    title: "הכנה מושלמת לראיון",
    desc: "סימולציות, ניתוח AI ודשבורד אישי להתקדמות.",
  },
  {
    image: "/landingPageImages/3.jpg",
    title: "היתרון שלך בשוק העבודה",
    desc: "כלים מתקדמים להצלחה בראיונות עבודה.",
  },
];

const TRANSITION_DURATION = 2000; // ms
const SLIDE_DURATION = 3000; // ms

const LandingPage = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setShow(true);
    timeoutRef.current = setTimeout(() => {
      setShow(false);
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setShow(true);
      }, TRANSITION_DURATION);
    }, SLIDE_DURATION);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const { image, title, desc } = slides[index];

  return (
    <>
      {user !== null && <Navigate to="/home" replace />}
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${image}')`,
          transition: `background-image ${TRANSITION_DURATION}ms ease`,
        }}
      >
        <div
          className={`flex flex-col items-center justify-center text-center p-10 bg-white bg-opacity-60 rounded-lg shadow-lg transition-opacity duration-700 
          ${
            //  show ?
            "opacity-100"
            //  :   'opacity-0'
          }
          `}
          style={{ transition: `opacity ${TRANSITION_DURATION}ms` }}
        >
          <Heading1>{title}</Heading1>
          <Paragraph className="mt-4 text-lg">{desc}</Paragraph>
          <Button
            variant="primary-dark"
            onClick={() => navigate("/login")}
            className="text-lg mt-4"
          >
            התחבר למערכת
          </Button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
