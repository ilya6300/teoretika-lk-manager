import React, { useEffect, useState } from "react";
import { PageComponent } from "../components/PageComponent";
import ScenariosOffline from "../components/scenarios/ScenariosOffline";
import ScenariosOnline from "../components/scenarios/ScenariosOnline";
import NewScenariosOnline from "../components/scenarios/NewScenariosOnline";
import NewScenariosOffline from "../components/scenarios/NewScenariosOffline";
import { observer } from "mobx-react-lite";
import stateScenarios from "../service/state/state.scenarios";

export const Scenarios = observer(() => {
  const [tabOffline, setTabOffline] = useState(true);
  const [tabOnline, setTabOnline] = useState(false);
  const [newScenariosOffline, setNewScenariosOffline] = useState(false);
  const [newScenariosOnline, setNewScenariosOnline] = useState(false);
  const [tabOfflineCls, setTabOfflineCls] = useState("tab_active");
  const [tabOnlineCls, setTabOnlineCls] = useState("tab_deactive");

  const selectedTabOffline = () => {
    setTabOffline(true);
    // setTabOnline(false);
    setTabOfflineCls("tab_active");
    // setTabOnlineCls("tab_deactive");
  };

  useEffect(() => {
    stateScenarios.resetData("join_data");
    stateScenarios.setParametr("filter_data", {});
    stateScenarios.resetData("offlineScenariosInterface");
    stateScenarios.setParametr("resultevent", "Нет данных");
  }, [!newScenariosOffline]);

  if (!newScenariosOffline) {
    return (
      <div className="container_main_top">
        <div className="tabContainer">
          <span onClick={selectedTabOffline} className={tabOfflineCls}>
            Сценарии на сайте
          </span>
        </div>
        {tabOffline ? <ScenariosOffline setNewScenariosOnline={setNewScenariosOnline} setNewScenariosOffline={setNewScenariosOffline} /> : <></>}
      </div>
    );
  }
  if (newScenariosOffline) {
    return (
      <div className="container_main_top">
        <NewScenariosOffline
          setNewScenariosOffline={setNewScenariosOffline}
          // goCard={goCard}
        />
      </div>
    );
  }
});
