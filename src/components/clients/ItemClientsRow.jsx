import React from "react";

export const ItemClientsRow = (props) => {
  return (
    <ul className="tr_clients_row">
      <span className="name_tr_clients_row">{props.c.name}</span>
      <span className="phone-email_tr_clients_row">{props.c.phone}</span>
      <span className="phone-email_tr_clients_row">{props.c.email}</span>
      <span className="id_tr_clients_row">{props.c.mast_id}</span>
    </ul>
  );
};
