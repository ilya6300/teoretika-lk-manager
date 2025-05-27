import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useLocation } from "react-router";

export const DashboardItem = observer((props) => {
  const location = useLocation();


  return (
    <Link
      to={
        props.d.link &&
        location.pathname !== `/${props.d.link}` &&
        props.d.link !== "visitor"
          ? `/${props.d.link}`
          : null
      }
    >
      <ul
        className={[props.classNameUl]}
        style={{
          opacity:
            location.pathname !== `/${props.d.link}` &&
            location.pathname !== "/home" &&
            location.pathname !== "/"
              ? 0.3
              : 1,
        }}
      >
        <li className="dashboard_item-name">{props.d.name}</li>
        <li className="dashboard_item-count">
          {new Intl.NumberFormat("ru-RU").format(props.d.count)}
        </li>
      </ul>
    </Link>
  );
});
