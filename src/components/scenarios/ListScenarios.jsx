import React from "react";
import ItemScenarios from "./ItemScenarios";
import { observer } from "mobx-react-lite";
import stateScenarios from "../../service/state/state.scenarios";

const ListScenarios = observer(({ data, removeScenarios }) => {
  if (data.length !== 0) {
    return (
      <ul className="list_container">
        <li className="tr_clients_row">
          <span className="name_tr_scenarios_row">Название сценария</span>
          <span
            className="description_tr_scenarios_row"
          >
            Описание
          </span>
          <span className="event_tr_scenarios_row">Тип</span>
          <div
            className="utilite_tr_scenarios_row title_table"
            style={{ justifyContent: "center" }}
          >
            Инструменты
          </div>
        </li>
        {data.map((s) =>
          (s.event === "popup" && stateScenarios.type_scenarios.popup) ||
          (s.event === "чат-строка" && stateScenarios.type_scenarios.string) ? (
            <ItemScenarios s={s} key={s.id} removeScenarios={removeScenarios} />
          ) : (
            <></>
          )
        )}
      </ul>
    );
  }
});

export default ListScenarios;
