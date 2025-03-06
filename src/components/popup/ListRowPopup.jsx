import React from "react";
import appState from "../../service/state/app.state";
import { ItemRowPopup } from "./ItemRowPopup";
import { observer } from "mobx-react-lite";

export const ListRowPopup = observer(({ data, removeHTML, viewHTML }) => {
  return (
    <ul className="list_container">
      <div className="tr_clients_row">
        <span className="name_tr_email_row title_table">
          Название email шаблона
        </span>
        <span
          className="utilite_tr_email_row title_table"
          style={{ justifyContent: "center" }}
        >
          Управление
        </span>
      </div>
      {data.map((h) => (
        <ItemRowPopup
          key={h.name}
          h={h}
          removeHTML={removeHTML}
          viewHTML={viewHTML}
        />
      ))}
    </ul>
  );
});
