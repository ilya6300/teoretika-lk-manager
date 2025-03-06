import React, { useLayoutEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import appState from "../service/state/app.state";
import { observer } from "mobx-react-lite";

export const PrivateRoute = observer(() => {
  //   useLayoutEffect(() => {
  //     console.log("useLayoutEffect", localStorage.getItem("at"));
  //     if (localStorage.getItem("at") !== null) {
  //       console.log("at_1");
  //       setIsAuth(true);
  //     } else {
  //       console.log("at_2");
  //       setIsAuth(false);
  //     }
  //   }, []);
  if (appState.isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
});
