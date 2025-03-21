import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import btnFilter from "../../images/icons/btn_filter.png";
import stateScenarios from "../../service/state/state.scenarios";
import { toJS } from "mobx";
import FiltersItemComponent from "./FiltersItemComponent";

const CurrentElementOffline = observer((props) => {
  // const removeElement = () => {
  //   stateScenarios.cutData(props.c.id);
  //   stateScenarios.scenariosElementremove(props.c.id);
  // };
  if (props.c.data.length) {
    return (
      <div className="scenarios_filter_span scenarios_filter_container">
        <div className="select_container">
          <select
            onChange={(e) => props.onChangeSelect(e, props.c)}
            className="inpt_v1"
          >
            <option defaultValue hidden>
              Выберите
            </option>
            {props.c.data.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
          <button onClick={() => props.removeElement(props.c)}>-</button>
        </div>
        {stateScenarios.offlineScenariosInterface[props.c.id + 1] !==
        undefined ? (
          <FiltersItemComponent id={props.c.id + 1} c={props.c} />
        ) : (
          <></>
        )}
      </div>
    );
  }
});

export default CurrentElementOffline;
