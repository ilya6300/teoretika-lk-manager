import React, { useLayoutEffect, useState } from "react";
import { DashboardList } from "../components/dashboard/DashboardList";
import { PageComponent } from "../components/PageComponent";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import { ListUsersRow } from "../components/clients/ListUsersRow";

export const Users = observer(() => {
  const [clientCard, setClientCard] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    console.log(location.pathname);
  }, []);
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
        <ListUsersRow clientCard={clientCard} setClientCard={setClientCard} />
      </div>
    </PageComponent>
  );
});
