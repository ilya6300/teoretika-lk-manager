import React, { useLayoutEffect, useState } from "react";
import { AddBtn } from "../../UI/components/AddBtn";
import appState from "../../service/state/app.state";
import ListScenarios from "./ListScenarios";
import apiRequest from "../../service/api/api.request";
import { observer } from "mobx-react-lite";
import stateScenarios from "../../service/state/state.scenarios";

const ScenariosOffline = observer(({ setNewScenariosOffline, goCard }) => {
  const getScenarios = async () => {
    await apiRequest.getOnlineScenarios();
  };
  useLayoutEffect(() => {
    getScenarios();
  }, []);
  const removeScenarios = async (e) => {
    console.log(e);
    const remove = await apiRequest.removeOnlineScenarios(e.id);
    if (remove) {
      await apiRequest.getOnlineScenarios();
    }
  };

  const FilterType = observer(() => {
    const typesFilter = [
      {
        name: "Поппап",
        id: "popup",
        filter: stateScenarios.type_scenarios.popup,
      },
      {
        name: "Строка чат-бота",
        id: "string",
        filter: stateScenarios.type_scenarios.string,
      },
      {
        name: "Е-майл",
        id: "email",
        filter: stateScenarios.type_scenarios.email,
      },
    ];

    const switchFilter = async (e) => {
      // console.log(e);
      const typeID = typesFilter.find((t) => t.id === e.id);
      if (typeID) {
        console.log(typeID);
        stateScenarios.setParametrTypeParametr(e.id, !typeID.filter);
        typeID.filter = !typeID.filter;
      }
    };

    return typesFilter.map((t) => (
      <span className="item_filter_type_scenarios" key={t.id} id={t.id}>
        {t.name}{" "}
        <label
          onClick={() => switchFilter(t)}
          className={t.filter ? "my_checkbox_v1_active" : "my_checkbox_v1"}
        ></label>
      </span>
    ));
  });

  return (
    <div className="scenarios_container">
      <div className="container_btn_scenarios">
        <div className="item_filter_type_scenarios">
          <FilterType />
        </div>
        <div className="item_filter_type_scenarios">
          <label className="item_btn_scenarios">
            Сценарии по фильтру
            <AddBtn onClick={() => setNewScenariosOffline(true)} />
          </label>
          {/* <label className="item_btn_scenarios">
              Сценарии для всех
              <AddBtn onClick={() => setNewScenariosOnline(true)} />
            </label> */}
        </div>
      </div>
      <ListScenarios
        data={appState.online_scenarios}
        removeScenarios={removeScenarios}
        // goCard={goCard}
      />
    </div>
  );
});

export default ScenariosOffline;
