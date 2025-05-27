import React, { useState } from "react";
import { DashboardList } from "../components/dashboard/DashboardList";
import { PageComponent } from "../components/PageComponent";
import { ListClientsRow } from "../components/clients/ListClientsRow";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";

export const Clients = observer(() => {
  const [clientCard, setClientCard] = useState(false);
  const location = useLocation();
  return (
    <PageComponent>
      {!clientCard ? (
        <div className="clients_dahsboard_top">
          <DashboardList classNameUl="dashboard_item-container_no_page" />
        </div>
      ) : (
        <></>
      )}

      <div className="clients_container">
        <ListClientsRow clientCard={clientCard} setClientCard={setClientCard} />
      </div>
    </PageComponent>
  );
});
