import React from "react";
import ItemScenarios from "./ItemScenarios";
import { observer } from "mobx-react-lite";
import stateScenarios from "../../service/state/state.scenarios";
import appState from "../../service/state/app.state";

const ListScenarios = observer(({ data, removeScenarios }) => {
  // if (data) {
  return (
    <ul className="list_container">
      <li className="tr_clients_row">
        <div className="w90">
          <span className="name_tr_scenarios_row">Название сценария</span>
          <span className="description_tr_scenarios_row">Описание</span>
          <span className="event_tr_scenarios_row">Тип</span>
        </div>
        <div
          className="utilite_tr_scenarios_row title_table"
          style={{ justifyContent: "center" }}
        >
          Инструменты
        </div>
      </li>
      {data ? (
        data.map((s) =>
          (s.event === "popup" && stateScenarios.type_scenarios.popup) ||
          (s.event === "чат-строка" && stateScenarios.type_scenarios.string) ? (
            <ItemScenarios s={s} key={s.id} removeScenarios={removeScenarios} />
          ) : (
            <></>
          )
        )
      ) : (
        <></>
      )}

      {appState.planer_scenarios !== undefined ? (
        appState.planer_scenarios.map((p) =>
          stateScenarios.type_scenarios.planer ? (
            <li className="tr_clients_row ">
              <label className="w90">
                <span className="name_tr_scenarios_row">{p.message}</span>
                <span className="description_tr_scenarios_row">
                  Период: {p.trigger}. Расылка id - {p.template}
                </span>
                <span className="event_tr_scenarios_row">Рассылки</span>
              </label>
              <div className="utilite_tr_scenarios_row">
                <button
                  className="delete_icon"
                  // onClick={() => props.removeScenarios(p)}
                ></button>
              </div>
            </li>
          ) : (
            <></>
          )
        )
      ) : (
        <></>
      )}
    </ul>
  );
  // }
});

export default ListScenarios;
