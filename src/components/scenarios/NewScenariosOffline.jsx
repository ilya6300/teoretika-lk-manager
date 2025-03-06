import React, { useLayoutEffect, useRef, useState } from "react";
import { PageComponent } from "../PageComponent";
import { AddBtn } from "../../UI/components/AddBtn";
import { BtnBackHeaderPage } from "../../UI/components/BtnBackHeaderPage";
import apiRequest from "../../service/api/api.request";
import SelectedScenarios from "../../UI/components/scenarios/SelectedScenarios";
import btnFilter from "../../images/icons/btn_filter.png";
import stateScenarios from "../../service/state/state.scenarios";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import playIcon from "../../images/icons/play.png";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";

const NewScenariosOffline = observer(({ setNewScenariosOffline }) => {
  const [nameRequest, setNameRequest] = useState("");
  const [selectVisible, setSelectVisible] = useState(false);
  const [lengthRequest, setLengthrequest] = useState(0);
  const first_data = ["клиент", "пользователь", "посетитель"];
  const refBtn = useRef(null);

  useLayoutEffect(() => {
    stateScenarios.resetData("join_data");
  }, []);

  const showSelec = async (name) => {
    console.log(name);
    let select;
    try {
      if (stateScenarios.offlineScenariosInterface.length === 0) {
        select = "";
      } else {
        console.log(nameRequest);
        select = nameRequest;
      }
      console.log(
        nameRequest,
        select,
        stateScenarios.offlineScenariosInterface[
          stateScenarios.offlineScenariosInterface.length - 1
        ]
      );
      const resSelect = await apiRequest.getFilterJoin(nameRequest);
      if (resSelect.current === undefined) {
        setSelectVisible(true);
        // setSelectData(resSelect);
      } else if (resSelect.current !== undefined) {
        console.log(resSelect["join"]);
        let joinData = [];
        for (let key in resSelect["join"]) {
          joinData = [...joinData, key];
        }
        stateScenarios.pushOfflineScenariosInterface(
          resSelect.current,
          resSelect["join"]
        );
        setSelectVisible(true);
        // setSelectData(joinData);
      }

      return resSelect;
    } catch (e) {
      console.error(e);
    }
  };

  const addFilterElement = (e) => {
    // console.log(toJS(e.condition));
    stateScenarios.updateOfflineScenariosInterface(e, "flag_filter", true);
  };

  const CurrentElementOffline = observer((props) => {
    return (
      <div className="scenarios_filter_span">
        {props.c.value}
        {!props.c.flag_filter ? (
          <button
            onClick={() => props.addFilterElement(props.c)}
            className="scenarios_filter_btn_img"
          >
            <img className="scenarios_filter_img" src={btnFilter} />
          </button>
        ) : (
          <></>
        )}

        {props.c.flag_filter ? (
          <div className="scenarios_filter_item">
            <select onChange={onChangeCondition} className="inpt_v1">
              {props.c.condition.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
            <ScenariosInpt />
          </div>
        ) : (
          <></>
        )}
        <select onChange={onChangeSelectNew} className="inpt_v1">
          {props.c.data.map((c) => (
            <option c={c} key={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    );
  });

  const onChangeCondition = (e) => {
    console.log(e.target.value);
  };
  const onChangeSelectNew = async (e) => {
    try {
      setNameRequest(e.target.value);
      console.log(e.target.value);
    } catch (e) {
      console.error(e);
    }
  };

  const playScenarios = async () => {
    console.log(stateScenarios.offlineScenariosInterface);
  };

  const filterBarRef = useRef(null);
  return (
    <div className="scenarios_container">
      <BtnBackHeaderPage onClick={() => setNewScenariosOffline(false)} />
      <div className="scenarios_container">
        <span>Выбрано: {lengthRequest}</span>
        <div className="scenarios_container_filter">
          <div className="scenarios_filter_bar" ref={filterBarRef}></div>

          {selectVisible ? (
            <SelectedScenarios data={first_data} onChange={onChangeSelectNew} />
          ) : (
            <></>
          )}
          {stateScenarios.offlineScenariosInterface.map((c) => (
            <CurrentElementOffline
              c={c}
              key={c.id}
              addFilterElement={addFilterElement}
            />
          ))}
          <AddBtn onClick={() => showSelec(nameRequest)} ref={refBtn} />
          <img
            className="scenarios_filter_play_icon"
            onClick={playScenarios}
            src={playIcon}
            alt=""
          />
        </div>
      </div>
    </div>
  );
});

export default NewScenariosOffline;
