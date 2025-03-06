import React, { useState } from "react";
import { PageComponent } from "../components/PageComponent";
import ScenariosOffline from "../components/scenarios/ScenariosOffline";
import ScenariosOnline from "../components/scenarios/ScenariosOnline";
import NewScenariosOnline from "../components/scenarios/NewScenariosOnline";
import NewScenariosOffline from "../components/scenarios/NewScenariosOffline";

export const Scenarios = () => {
  const [tabOffline, setTabOffline] = useState(false);
  const [tabOnline, setTabOnline] = useState(true);
  const [newScenariosOffline, setNewScenariosOffline] = useState(false);
  const [newScenariosOnline, setNewScenariosOnline] = useState(false);
  const [tabOfflineCls, setTabOfflineCls] = useState("tab_deactive");
  const [tabOnlineCls, setTabOnlineCls] = useState("tab_active");

  const selectedTabOffline = () => {
    setTabOffline(true);
    setTabOnline(false);
    setTabOfflineCls("tab_active");
    setTabOnlineCls("tab_deactive");
  };
  const selectedOnline = () => {
    setTabOffline(false);
    setTabOnline(true);
    setTabOfflineCls("tab_deactive");
    setTabOnlineCls("tab_active");
  };

  if (!newScenariosOffline && !newScenariosOnline) {
    return (
      <PageComponent title="Сценарии">
        <div className="tabContainer">
          <span onClick={selectedTabOffline} className={tabOfflineCls}>
            Оффлайн
          </span>
          <span onClick={selectedOnline} className={tabOnlineCls}>
            Онлайн
          </span>
        </div>
        {tabOffline ? (
          <ScenariosOffline setNewScenariosOffline={setNewScenariosOffline} />
        ) : (
          <></>
        )}
        {tabOnline ? (
          <ScenariosOnline setNewScenariosOnline={setNewScenariosOnline} />
        ) : (
          <></>
        )}
      </PageComponent>
    );
  }
  if (newScenariosOnline && !newScenariosOffline) {
    return (
      <React.StrictMode>
        <PageComponent title="Создание онлайн сценария">
          <NewScenariosOnline setNewScenariosOnline={setNewScenariosOnline} />
        </PageComponent>
      </React.StrictMode>
    );
  }
  if (newScenariosOffline && !newScenariosOnline) {
    return (
      <React.StrictMode>
        <PageComponent title="Создание оффлайн сценария">
          <NewScenariosOffline
            setNewScenariosOffline={setNewScenariosOffline}
          />
        </PageComponent>
      </React.StrictMode>
    );
  }
};
