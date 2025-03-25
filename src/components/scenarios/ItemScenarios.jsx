import React, { useLayoutEffect } from "react";
import { Link } from "react-router";

const ItemScenarios = (props) => {
  useLayoutEffect(() => {
    console.log(props.s);
  }, []);
  return (
    <li className="tr_clients_row ">
      <Link
        className="w90"
        to={`/scenarios/${props.s.id}`}
        state={{
          body: props.s.body,
          descriptionScenarios: props.s.description,
          id_event: props.s.id_event,
          nameScenarios: props.s.name,
          event: props.s.event,
          type: props.s.type,
        }}
      >
        <span
          // onClick={() => props.goCard(props.s)}
          className="name_tr_scenarios_row"
        >
          {props.s.name}
        </span>
        <span
          // onClick={() => props.goCard(props.s)}
          className="description_tr_scenarios_row"
        >
          {props.s.description !== null ? props.s.description : ""}
        </span>
        <span className="event_tr_scenarios_row">{props.s.event}</span>
      </Link>
      <div className="utilite_tr_scenarios_row">
        <button
          className="delete_icon"
          onClick={() => props.removeScenarios(props.s)}
        ></button>
      </div>
    </li>
  );
};

export default ItemScenarios;
