import React from "react";

export const ItemUsersRow = (props) => {
  return (
    <ul className="tr_clients_row">
      <span className="name_tr_clients_row">
        {props.c.cms_user_last_name} {props.c.cms_user_first_name}
      </span>
      <span className="phone-email_tr_clients_row">
        {props.c.phone_number.replace(/["',\[\]]/g, "")}
      </span>
      <span className="phone-email_tr_clients_row">
        {props.c.cms_user_email.replace(/["',\[\]]/g, "")}
      </span>
      {/* <span className="id_tr_clients_row">{props.c.mast_id}</span> */}
    </ul>
  );
};
