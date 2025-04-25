import React, { useState } from "react";
import usrpflImg from "../../images/icons/icons-profile_v2.png";
import usrpflImgActive from "../../images/icons/icons-profile_v2_active.png";
import { NavLink, useLocation } from "react-router";
import logo from "../../images/logo.png";

export const Header = () => {
  const [iconProfile, setIconProFile] = useState(usrpflImg);
  const location = useLocation();
  return (
    <div className="header_container">
      <div className="logo_and_link">
        <img className="logo" src={logo} alt="" />
        <div className="header_container_pages">
          <NavLink className="nav_link" to={"/scenarios"}>
            Сценарии
          </NavLink>
          <NavLink className="nav_link" to={"/home"}>
            Клиенты
          </NavLink>
          <NavLink className="nav_link" to={"/html"}>
            HTML шаблоны
          </NavLink>
        </div>
      </div>

      {location.pathname !== "/profile" ? (
        <NavLink to={"/profile"}>
          <img
            onMouseMove={() => setIconProFile(usrpflImgActive)}
            onMouseOut={() => setIconProFile(usrpflImg)}
            src={iconProfile}
          />
        </NavLink>
      ) : (
        <NavLink to={"/profile"}>
          <img
            src={usrpflImgActive}
            onMouseOut={() => setIconProFile(usrpflImg)}
          />
        </NavLink>
      )}
    </div>
  );
};
