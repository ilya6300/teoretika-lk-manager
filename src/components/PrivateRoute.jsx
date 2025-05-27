import React, { useLayoutEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import appState from "../service/state/app.state";
import { observer } from "mobx-react-lite";

export const PrivateRoute = observer(() => {
  if (appState.isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
});
