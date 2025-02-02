import React, { useLayoutEffect } from "react";
import { DashboardList } from "../components/dashboard/DashboardList";
import { PageComponent } from "../components/PageComponent";
import { ListClientsRow } from "../components/clients/ListClientsRow";

export const Clients = () => {
  useLayoutEffect(() => {}, []);
  return (
    <PageComponent>
      <div className="clients_dahsboard_top">
        <DashboardList classNameUl="dashboard_item-container_no_page" />
      </div>
      <div className="clients_container">
        <ListClientsRow />
      </div>
    </PageComponent>
  );
};
