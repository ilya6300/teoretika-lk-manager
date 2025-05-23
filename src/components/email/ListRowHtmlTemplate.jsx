import React from "react";
import appState from "../../service/state/app.state";
import { ItemRowHtmlTemplate } from "./ItemRowEmail";
import { observer } from "mobx-react-lite";

export const ListRowHtmlTemplate = observer(({ removeHTML, viewHTML }) => {
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
      {appState.templatesHTMLEmail.map((h) => (
        <ItemRowHtmlTemplate
          key={h.name}
          h={h}
          removeHTML={removeHTML}
          viewHTML={viewHTML}
        />
      ))}
    </ul>
  );
});
