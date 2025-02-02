import React from "react";
import { Link } from "react-router";
import { PageComponent } from "../components/PageComponent";
import { DashboardList } from "../components/dashboard/DashboardList";

export const Home = () => {
  return (
    <PageComponent>
      <DashboardList classNameUl="dashboard_item-container" />
    </PageComponent>
  );
};
