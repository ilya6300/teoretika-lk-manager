import React from "react";

const ItemScenarios = (props) => {
  return (
    <li className="tr_clients_row ">
      <span onClick={() => props.goCard(props.s)} className="name_tr_email_row">{props.s.name}</span>
      <div className="utilite_tr_email_row"></div>
    </li>
  );
};

export default ItemScenarios;
