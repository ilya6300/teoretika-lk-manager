import React from "react";

export const DashboardItem = (props) => {
  return (
    <ul className="dashboard_item-container">
      <li className="dashboard_item-name">{props.d.name}</li>
      <li className="dashboard_item-count">
        {new Intl.NumberFormat("ru-RU").format(props.d.count)}
      </li>
    </ul>
  );
};
