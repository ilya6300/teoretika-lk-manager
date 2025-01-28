import { Route, Routes } from "react-router";
import "./style/App.css";
import { Clients } from "./pages/Clients";
import { Auth } from "./pages/Auth";
import { Layout } from "./components/Layout";
import { useEffect, useLayoutEffect, useState } from "react";
import media from "./state/media";
import { UserProfile } from "./pages/UserProfile";
import { PrivateRoute } from "./components/PrivateRoute";
import appState from "./state/app.state";
import EmailPage from "./pages/EmailPage";

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    media.handlerResize(width);
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
      media.handlerResize(width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  useLayoutEffect(() => {
    if (localStorage.getItem("at") !== null) {
      console.log("at_1");
      appState.setParameters("isAuth", true);
    } else {
      console.log("at_2");
      appState.setParameters("isAuth", false);
    }
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Auth />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Clients />} />
          <Route path="profile" element={<UserProfile />} />
          <Route index path="clients" element={<Clients />} />
          <Route index path="email" element={<EmailPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
