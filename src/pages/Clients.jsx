import React from "react";
import { Link } from "react-router";
import { PageComponent } from "../components/PageComponent";
import { DashboardList } from "../components/dashboard/DashboardList";

export const Clients = () => {
  const id = 454545412;
  const name = "Leonid";
  const fakeClients = [
    {
      id: 1,
      name: "Клиенты",
      count: 13527,
    },
    {
      id: 2,
      name: "Подписчики",
      count: 800,
    },
    {
      id: 3,
      name: "Пользователи",
      count: 2552458,
    },
  ];
  return (
    <PageComponent>
      {/* <img
        width="1"
        height="1"
        src={`http://10.76.10.37:5053/api/v1/auth/id=${encodeURIComponent(
          id
        )}&name=${encodeURIComponent(name)}`}
      /> */}
      <DashboardList data={fakeClients} />
    </PageComponent>
  );
};
