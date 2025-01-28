import React from "react";
import { DashboardItem } from "./DashboardItem";

export const DashboardList = ({ data }) => {
  return (
    <div className="dashboard_container">
      {data.map((d) => (
        <DashboardItem key={d.id} d={d} />
      ))}
    </div>
  );
};
