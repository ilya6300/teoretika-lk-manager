import { Route, Routes } from "react-router";
import "./style/App.css";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Layout } from "./components/Layout";
import { useEffect, useLayoutEffect, useState } from "react";
import media from "./service/state/media";
import { UserProfile } from "./pages/UserProfile";
import { PrivateRoute } from "./components/PrivateRoute";
import appState from "./service/state/app.state";
import { TemplatesHTML } from "./pages/TemplatesHTML";
import { Clients } from "./pages/Clients";
import { ClientCard } from "./pages/ClientCard";
import { NewTemplateHtml } from "./pages/NewTemplateHtml";
import { Scenarios } from "./pages/Scenarios";
import { Users } from "./pages/Users";
import { UsersCard } from "./pages/UsersCard";
import ScenariosCard from "./pages/ScenariosCard";

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
      appState.setParameters("isAuth", true);
    } else {
      appState.setParameters("isAuth", false);
    }
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Auth />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<UserProfile />} />
          <Route index path="home" element={<Home />} />
          <Route path="clients" element={<Clients />} />
          <Route path="users" element={<Users />} />
          {/* <Route path="visitor" element={<Clients />} /> */}
          {/* <Route path="clients/:cms_user_id" element={<ClientCard />} /> */}
          {/* <Route path="users/:cms_user_id" element={<UsersCard />} /> */}
          <Route path="html" element={<TemplatesHTML />} />
          <Route path="scenarios" element={<Scenarios />} />
          <Route path="scenarios/:id" element={<ScenariosCard />} />
          <Route path="newhtml" element={<NewTemplateHtml />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
