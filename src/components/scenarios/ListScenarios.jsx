import React from "react";
import ItemScenarios from "./ItemScenarios";
import { observer } from "mobx-react-lite";
import stateScenarios from "../../service/state/state.scenarios";
import appState from "../../service/state/app.state";
import { Link } from "react-router";

const ListScenarios = observer(
  ({ data, removeScenarios, removeEmailPlaner }) => {
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
            (s.event === "чат-строка" &&
              stateScenarios.type_scenarios.string) ? (
              <ItemScenarios
                s={s}
                key={s.id}
                removeScenarios={removeScenarios}
              />
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
              <li key={p.message_id} className="tr_clients_row ">
                <Link
                  to={`/scenarios/${p.message_id}`}
                  state={{
                    body: JSON.stringify(p.body),
                    descriptionScenarios: "",
                    id_event: p.template,
                    nameScenarios: p.message,
                    event: "рассылка",
                    type: "templates",
                    message_id: p.message_id,
                    trigger: p.trigger,
                    list_to: JSON.stringify(p.list_to),
                    query_params: JSON.stringify(p.query_params),
                    start_date: p.start_date,
                    end_date: p.end_date,
                  }}
                  className="w90"
                >
                  <span className="name_tr_scenarios_row">{p.message}</span>
                  <span className="description_tr_scenarios_row">
                    Период: {p.trigger}. Расылка id - {p.template}
                  </span>
                  <span className="event_tr_scenarios_row">Рассылки</span>
                </Link>
                <div className="utilite_tr_scenarios_row">
                  <span
                    onClick={() => removeEmailPlaner(p)}
                    className="scenarios_tools_btn_remove_text"
                  >
                    Удалить
                  </span>
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
  }
);

export default ListScenarios;
