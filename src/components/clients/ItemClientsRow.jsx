import { observer } from "mobx-react-lite";
import React from "react";

export const ItemClientsRow = observer((props) => {
  return (
    <ul className="tr_clients_row">
      <span className="name_tr_clients_row">
        {props.c.crm_contact_name}{" "}
        {props.c.crm_contact_second_name !== null
          ? props.c.crm_contact_second_name
          : ""}
      </span>
      <span className="phone-email_tr_clients_row">
        {props.c.crm_contact_phones.replace(/["',\[\]]/g, "")}
      </span>
      <span className="phone-email_tr_clients_row">
        {props.c.crm_contact_emails.replace(/["',\[\]]/g, "")}
      </span>
      {/* <span className="id_tr_clients_row">{props.c.mast_id}</span> */}
    </ul>
  );
});
