import React from "react";
import Landing from "pages/common/Landing/Landing";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import KoreaAttend from "pages/korea/KoreaAttend/KoreaAttend";
import LectureHall from "pages/common/LectureHall/LectureHall";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import Registration from "pages/common/Registration/Registration";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";

export default [
  {
    path: "/kr",
    element: <Landing key="kr-landing-section" />,
  },
  {
    path: "/kr/speakers",
    element: <Speakers />,
  },
  {
    path: "/kr/attend",
    element: <KoreaAttend />,
  },
  {
    path: "/kr/program",
    element: <Programs />,
  },
  {
    path: "/kr/lecture-hall",
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: "/kr/exhibit/parksystems",
    element: <ExhibitParkSystems />,
  },
  {
    path: "/kr/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "/kr/sponsors",
    element: <Sponsors />,
  },
  {
    path: "/kr/user/reset-password",
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: "/kr/user/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/kr/registration",
    element: <Registration formNo="1239" />,
  },
];
