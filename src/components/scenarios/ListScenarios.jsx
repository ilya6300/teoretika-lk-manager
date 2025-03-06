import React from "react";
import ItemScenarios from "./ItemScenarios";
import { observer } from "mobx-react-lite";

const ListScenarios = observer(({ data, goCard }) => {
  if (data.length !== 0) {
    return (
      <ul className="list_container">
        <li className="tr_clients_row">
          <span className="name_tr_email_row">Название сценария</span>
          <div
            className="utilite_tr_email_row title_table"
            style={{ justifyContent: "center" }}
          >
            Инструменты
          </div>
        </li>
        {data.map((s) => (
          <ItemScenarios s={s} key={s.id} goCard={goCard} />
        ))}
      </ul>
    );
  }
});

export default ListScenarios;
