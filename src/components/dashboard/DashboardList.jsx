import React from "react";
import { DashboardItem } from "./DashboardItem";

export const DashboardList = (props) => {

  const fakeClients = [
    {
      id: 1,
      name: "Клиенты",
      count: 3,
      // data: [],
      link: "clients",
    },
    {
      id: 2,
      name: "Подписчики",
      count: 800,
      // data: [],
    },
    {
      id: 3,
      name: "Пользователи",
      count: 2552458,
      // data: [],
    },
  ];

  return (
    <div className="dashboard_container">
      {fakeClients.map((d) => (
        <DashboardItem key={d.id} d={d} classNameUl={props.classNameUl} />
      ))}
    </div>
  );
};
