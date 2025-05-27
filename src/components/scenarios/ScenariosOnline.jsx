import React, { useLayoutEffect, useState } from "react";
import { AddBtn } from "../../UI/components/AddBtn";
import ListScenarios from "./ListScenarios";
import apiRequest from "../../service/api/api.request";
import { observer } from "mobx-react-lite";
import appState from "../../service/state/app.state";
import CardOnlineScenarios from "../../pages/CardOnlineScenarios";

const ScenariosOnline = observer(({ setNewScenariosOnline }) => {
  const [card, setCard] = useState(null);
  const [cardFlag, setCardFlag] = useState(false);
  const getScenarios = async () => {
    await apiRequest.getOnlineScenarios();
  };
  useLayoutEffect(() => {
    getScenarios();
  }, []);
  const goCard = (e) => {
    setCard(e);
    setCardFlag(true);
  };
  if (!cardFlag) {
    return (
      <div className="scenarios_container">
        <AddBtn onClick={() => setNewScenariosOnline(true)} />
        <ListScenarios data={appState.online_scenarios} goCard={goCard} />
      </div>
    );
  } else {
    return <CardOnlineScenarios card={card} setCardFlag={setCardFlag} />;
  }
});

export default ScenariosOnline;
