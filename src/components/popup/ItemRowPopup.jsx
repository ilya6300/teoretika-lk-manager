import { observer } from "mobx-react-lite";
import React from "react";

export const ItemRowPopup = observer((props) => {
  return (
    <li className="tr_clients_row">
      <span
        onClick={() => props.viewHTML(props.h)}
        className="name_tr_email_row"
      >
        {props.h.name}
      </span>
      <div className="utilite_tr_email_row">
        {/* <div
          onClick={() => props.removeHTML(props.h)}
          className="remove_container"
          title="Удалить шаблон"
        ></div> */}
      </div>
    </li>
  );
});
