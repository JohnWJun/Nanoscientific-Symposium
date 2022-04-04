import React from "react";
import Landing from "pages/common/Landing/Landing";
import PrivateRoute from "components/Route/PrivateRoute";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import LectureHall from "pages/common/LectureHall/LectureHall";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import AdminRoute from "components/Route/AdminRoute";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import Registration from "pages/common/Registration/Registration";

export default [
  {
    path: "/us",
    element: (
      <AdminRoute redirect="/">
        <Landing />
      </AdminRoute>
    ),
  },
  {
    path: "/us/speakers",
    element: (
      <AdminRoute key="/us/speakers">
        <Speakers />
      </AdminRoute>
    ),
  },
  {
    path: "/us/program",
    element: (
      <AdminRoute key="/us/program">
        <Programs />
      </AdminRoute>
    ),
  },
  {
    path: "/us/lecture-hall",
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: "/us/exhibit/parksystems",
    element: <ExhibitParkSystems />,
  },
  {
    path: "/us/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "/us/registration",
    element: <Registration formNo="1184" />,
  },
  {
    path: "/us/sponsors",
    element: <Sponsors />,
  },
  {
    path: "/us/user/reset-password",
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: "/us/user/forgot-password",
    element: <ForgotPassword />,
  },
];
