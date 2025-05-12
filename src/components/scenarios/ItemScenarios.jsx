import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router";
import apiRequest from "../../service/api/api.request";
import iconPlay from "../../images/icons/play.png";
import { observer } from "mobx-react-lite";
import appState from "../../service/state/app.state";

const ItemScenarios = observer((props) => {
  const [isActive, setIsActive] = useState(JSON.parse(props.s.body).is_active);
  const [count, setCount] = useState(0);
  const changeActive = async () => {
    const body_ = JSON.parse(props.s.body);
    body_.is_active = !isActive;
    setIsActive(!isActive);
    apiRequest.patchOnlineScenarios(props.s.id, {
      body: JSON.stringify(body_),
    });
  };
  useEffect(() => {
    const countID = appState.counter_scenarios.find(
      (c) => c.id_online_scripts === props.s.id
    );
    if (countID) {
      // console.log(countID);
      setCount(countID.count_event);
    }
  }, [appState.counter_scenarios]);
  useLayoutEffect(() => {
    console.log("ItemScenarios", props.s);
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
          is_active: isActive,
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
        <label onClick={changeActive}>
          {" "}
          {isActive ? (
            <span className="scenarios_tools_btn_text">Остановить</span>
          ) : (
            <span className="scenarios_tools_btn_text">Запустить</span>
            // <img
            //   className="play_scenarios_btn"
            //   src={iconPlay}
            //   alt="Остановлен"
            // />
          )}
        </label>
        {count}
        {/* <button
          className="delete_icon"
          onClick={() => props.removeScenarios(props.s)}
        ></button> */}
        <span
          onClick={() => props.removeScenarios(props.s)}
          className="scenarios_tools_btn_remove_text"
        >
          Удалить
        </span>
      </div>
    </li>
  );
});

export default ItemScenarios;
