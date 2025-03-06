import React from "react";
import { DashboardItem } from "./DashboardItem";
import appState from "../../service/state/app.state";
import { observer } from "mobx-react-lite";

export const DashboardList = observer((props) => {
  return (
    <div className="dashboard_container">
      {appState.collection.data.map((d) => (
        <DashboardItem key={d.link} d={d} classNameUl={props.classNameUl} />
      ))}
    </div>
  );
});
