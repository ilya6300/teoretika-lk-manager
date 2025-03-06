import React, { useLayoutEffect } from "react";
import { Link } from "react-router";
import { PageComponent } from "../components/PageComponent";
import { DashboardList } from "../components/dashboard/DashboardList";
import appState from "../service/state/app.state";
import { observer } from "mobx-react-lite";
import apiRequest from "../service/api/api.request";

export const Home = observer(() => {
  useLayoutEffect(() => {
    const getClients = async () => {
      await apiRequest.getAllClient();
    };
    getClients();
  }, []);
  return (
    <PageComponent>
      {appState.collection.isLoader ? (
        <DashboardList classNameUl="dashboard_item-container" />
      ) : (
        <p>Идёт загрузка</p>
      )}
    </PageComponent>
  );
});
