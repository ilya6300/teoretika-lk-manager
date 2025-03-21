import React, { useState } from "react";
import stateScenarios from "../../service/state/state.scenarios";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import TypeValue from "./TypeValue";

const FiltersItemComponent = observer(({ id, c }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterVisibleName, setFilterVisibleName] = useState("Показать фильтр");
  const filterVisibleFunc = () => {
    if (!filterVisible) {
      setFilterVisibleName("Скрыть фильтры");
    } else {
      setFilterVisibleName("Показать фильтры");
    }
    setFilterVisible(!filterVisible);
  };
  const switchFilter = (f) => {
    stateScenarios.updateSwitchFilter(
      stateScenarios.offlineScenariosInterface[id].id,
      f.name
    );
    // if (f.filter) {
    //   stateScenarios.addJoinData(f.name);
    // } else {
    //   stateScenarios.removeJoinData(f.name);
    // }
    // console.log(f);
  };
  return (
    <div className="offline_filter_container">
      <div className="offline_filter_nav" onClick={filterVisibleFunc}>
        {filterVisibleName}
      </div>
      {filterVisible
        ? stateScenarios.offlineScenariosInterface[id].filter.map((f) => (
            <div className="offline_filter_row_current" key={f.name}>
              <div className="offline_filter_row_filter_container">
                {f.info.comment}
                <label
                  onClick={() => switchFilter(f)}
                  className={
                    f.filter ? "my_checkbox_v1_active" : "my_checkbox_v1"
                  }
                ></label>
              </div>
              {f.filter ? (
                <TypeValue
                  f={f}
                  c={c}
                  id={stateScenarios.offlineScenariosInterface[id].id}
                />
              ) : (
                <></>
              )}
            </div>
          ))
        : stateScenarios.offlineScenariosInterface[id].filter.map((f) =>
            f.filter ? (
              <div className="offline_filter_row_current" key={f.name}>
                <div className="offline_filter_row_filter_container">
                  {f.info.comment}
                  <label
                    onClick={() => switchFilter(f)}
                    className={
                      f.filter ? "my_checkbox_v1_active" : "my_checkbox_v1"
                    }
                  ></label>
                </div>
                {f.filter ? (
                  <TypeValue
                    f={f}
                    c={c}
                    id={stateScenarios.offlineScenariosInterface[id].id}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )
          )}
    </div>
  );
});

export default FiltersItemComponent;
