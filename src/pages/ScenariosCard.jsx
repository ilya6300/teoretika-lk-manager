import { observer } from "mobx-react-lite";
import { useParams, useLocation, Link } from "react-router";
import React, { useLayoutEffect, useRef, useState } from "react";
import apiRequest from "../service/api/api.request";
import stateScenarios from "../service/state/state.scenarios";
import { toJS } from "mobx";
import appState from "../service/state/app.state";
import { BtnBackHeaderPage } from "../UI/components/BtnBackHeaderPage";
import SelectedScenarios from "../UI/components/scenarios/SelectedScenarios";
import FiltersItemComponent from "../components/scenarios/FiltersItemComponent";
import CurrentElementOffline from "../components/scenarios/CurrentElementOffline";
import SelectedScenariosName from "../UI/components/scenarios/SelectedScenariosName";
import ScenariosInpt from "../UI/components/scenarios/ScenariosInpt";
import { AddBtn } from "../UI/components/AddBtn";
import playIcon from "../images/icons/save.png";
import iconRefresh from "../images/icons/reload.png";
import { PageComponent } from "../components/PageComponent";

const ScenariosCard = observer(({ setNewScenariosOffline }) => {
  const { id } = useParams();
  const location = useLocation();
  const {
    body,
    descriptionScenarios,
    nameScenarios,
    event,
    type,
    id_event,
    is_active,
  } = location.state || {};

  const [nameRequest, setNameRequest] = useState("");
  const [selectVisible, setSelectVisible] = useState(false);
  const first_data = ["клиент", "пользователь", "посетитель"];
  const [selectEvent, setSelectEvent] = useState(false);
  const [name, setName] = useState("");
  const [typeEventString, setTypeEventString] = useState("");
  const [typeEvent, setTypeEvent] = useState(null);
  const eventData = ["popup", "чат-строка", "рассылка"];
  const [nameVisible, setNameVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [firstNameScenarios, setFirstNameScenarios] = useState("Выберите");
  const [firstNameEvent, setFirstNameEvent] = useState("Событие");
  const [objReques, setObjReques] = useState({
    type: "",
    name: "",
    event: "",
    id_event: "",
    description: "",
  });
  const refValueEvent = useRef(null);

  const autoRequest = async () => {
    try {
      let getKey = false;
      const bodyBuild = JSON.parse(body);
      for (const b of bodyBuild.build) {
        await getSelect(b);
      }
      setSelectVisible(true);

      //   setTimeout(() => {
      // stateScenarios.offlineScenariosInterface.map((d) => {
      let joinID = null;
      getKey = true;
      const e = {
        target: {
          value: event,
        },
      };
      if (getKey) {
        onChangeEvent(e);
        for (let keyJoin in bodyBuild.filter) {
          joinID = stateScenarios.offlineScenariosInterface.find(
            (j) => j.current === keyJoin
          );
          if (joinID) {
            for (let keyFilter in bodyBuild.filter[keyJoin]) {
              joinID = {
                ...joinID,
                value: bodyBuild.filter[keyJoin][keyFilter],
                keyFilter: keyFilter,
              };
            }
          }
          if (joinID) {
            const filterID = joinID.filter.find(
              (f) => f.name === joinID.keyFilter
            );
            console.log("filterID ==> fff", toJS(filterID), toJS(joinID));
            filterID.filter = true;
            filterID.value = joinID.value[0];
            filterID.condition = joinID.value[1];
            stateScenarios.updateValueFilter(
              joinID.id,
              joinID.keyFilter,
              joinID.value[0],
              joinID.value[1],
              joinID
            );
          }
        }
      }

      // });
      //   }, 300);
    } catch (e) {
      console.error(e);
    }
  };

  useLayoutEffect(() => {
    console.log(descriptionScenarios, nameScenarios, event, type);
    autoRequest();
    setSelectEvent(true);
    setNameVisible(true);
    setName(nameScenarios);
    setDescription(descriptionScenarios);
    setFirstNameEvent(event);
    // objReques = {...objReques, name: nameScenarios, }
    objReques.name = nameScenarios;
    objReques.description = descriptionScenarios;
    objReques.id_event = id_event;

    // stateScenarios.resetData("join_data");
    // showSelec();
    // setTimeout(() => {
    // refValueEvent.current.value = "13";
    // console.log(refValueEvent);
    // }, 500);
  }, []);

  const getSelect = async (name) => {
    try {
      const resSelect = await apiRequest.getFilterJoin(name);
      if (resSelect.current === undefined || resSelect.current === "new") {
      } else if (resSelect.current !== undefined) {
        let joinData = [];
        for (let key in resSelect["join"]) {
          joinData = [...joinData, key];
        }

        if (!stateScenarios.offlineScenariosInterface.length) {
          stateScenarios.pushOfflineScenariosInterface(
            resSelect.current,
            resSelect["join"],
            resSelect["filter"]
          );
          stateScenarios.addJoinData(resSelect.current, name);
        } else {
          stateScenarios.pushOfflineScenariosInterface(
            resSelect.current,
            resSelect["join"],
            resSelect["filter"]
          );

          stateScenarios.addJoinData(resSelect.current, name);
        }
      }

      return resSelect;
    } catch (e) {
      console.error("getSelect", e);
    } finally {
      await apiRequest.getFilter();
    }
  };

  const onChangeSelect = async (e, c) => {
    try {
      stateScenarios.cutData(c.id);
      await getSelect(e.target.value);
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeSelectNew = async (e) => {
    try {
      setNameRequest(e.target.value);
      await getSelect(e.target.value);
      setSelectVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const playScenarios = async () => {
    try {
      function extractMastIds(obj, result = new Set()) {
        if (obj && typeof obj === "object") {
          if (obj.mast_id) {
            result.add(` &${obj.mast_id}`); // Добавляем mast_id в Set
          }
          // Рекурсивно обходим все ключи объекта
          Object.values(obj).forEach((value) => extractMastIds(value, result));
        }
        return result;
      }
      // Собираем все уникальные mast_id
      const uniqueMastIds = [
        ...stateScenarios.resultevent.reduce((acc, item) => {
          extractMastIds(item, acc); // Обрабатываем каждый объект в массиве
          return acc;
        }, new Set()),
      ];
      if (objReques.name === "") {
        return alert("Имя не задано");
      }
      if (objReques.description === "") {
        return alert("Описание не задано");
      }
      console.log(objReques);
      if (JSON.stringify(stateScenarios.filter_data) !== "{}") {
        apiRequest.patchOnlineScenarios(id, {
          type: objReques.type,
          name: objReques.name,
          event: objReques.event,
          body: JSON.stringify({
            build: stateScenarios.build_data,
            join: stateScenarios.join_data,
            filter: stateScenarios.filter_data,
            order: "{}",
            is_active: is_active,
          }),
          description: objReques.description,
          id_event: Number(objReques.id_event),
          type_user: String(uniqueMastIds)
            .replace(/^ /g, "")
            .replace(/$/g, ","),
        });
      } else {
        alert("Филтры не настроены");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeElement = (e) => {
    stateScenarios.cutData(e.id);
    stateScenarios.scenariosElementremove(e.id + 1);
  };

  const clearScenarios = async () => {
    stateScenarios.resetData("join_data");
    stateScenarios.setParametr("filter_data", {});
    stateScenarios.resetData("offlineScenariosInterface");
    stateScenarios.setParametr("resultevent", "Нет данных");
    setSelectVisible(false);
    // await apiRequest.getFilter();
  };

  const onChangeEvent = async (e) => {
    console.log("onChangeEvent", e, e.target);
    const value = e.target.value;
    setTypeEventString(value);
    if (value === "popup") {
      const res = await apiRequest.getHTMLTemplatePopup();
      setObjReques(
        objReques,
        ...(objReques.event = value),
        (objReques.type = "routing")
      );
      if (res) {
        setTypeEvent(res);
      }
    }
    if (value === "чат-строка") {
      const res = await apiRequest.getHTMLTemplatString();
      setObjReques(
        objReques,
        ...((objReques.event = value), (objReques.type = "strings"))
      );
      if (res) {
        setTypeEvent(res);
      }
    }
  };
  const onChangeEventID = async (e) => {
    const resID =
      typeEventString === "popup"
        ? appState.templatesHTMLPopup.find((p) => p.name === e.target.value)
        : appState.templatesHTMLString.find((p) => p.name === e.target.value);
    if (resID) {
      setObjReques(objReques, ...(objReques.id_event = String(resID.id)));
    }
    setNameVisible(true);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
    setObjReques(objReques, ...(objReques.name = e.target.value));
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    setObjReques(objReques, ...(objReques.description = e.target.value));
  };

  const filterBarRef = useRef(null);
  return (
    <PageComponent>
      <div className="scenarios_container">
        <Link to={`/scenarios`}>
          <BtnBackHeaderPage />
        </Link>
        <div className="scenarios_container">
          <span>
            Выбрано:{" "}
            {stateScenarios.resultevent !== "Нет данных"
              ? stateScenarios.resultevent.length
              : 0}
          </span>
          <div className="scenarios_container_filter">
            <div className="scenarios_filter_bar" ref={filterBarRef}></div>
            {!selectVisible ? (
              <SelectedScenarios
                firstName={firstNameScenarios}
                data={first_data}
                onChange={onChangeSelectNew}
              />
            ) : (
              <div className="scenarios_filter_container scenarios_filter_span">
                <div className="scenarios_filter_span">
                  <div className="select_container">
                    <select className="inpt_v1">
                      <option>
                        {/* {nameRequest} */}
                        {stateScenarios.build_data[0]}
                      </option>
                    </select>
                    <img
                      className="icon_reload"
                      src={iconRefresh}
                      alt="Сбросить"
                      onClick={clearScenarios}
                    />
                  </div>
                </div>
                <div>
                  <FiltersItemComponent
                    id={0}
                    c={stateScenarios.offlineScenariosInterface[0]}
                  />
                </div>
              </div>
            )}
            {stateScenarios.offlineScenariosInterface.map((c) => (
              <CurrentElementOffline
                removeElement={removeElement}
                c={c}
                key={c.id}
                onChangeSelect={onChangeSelect}
                // addFilterElement={addFilterElement}
              />
            ))}

            {selectEvent ? (
              <div className="scenarios_container_filter_select_event">
                <SelectedScenarios
                  refValue={refValueEvent}
                  firstName={firstNameEvent}
                  data={eventData}
                  onChange={onChangeEvent}
                />
                {typeEvent !== null ? (
                  <SelectedScenariosName
                    data={typeEvent}
                    onChange={onChangeEventID}
                    cls="inpt_v1"
                  />
                ) : (
                  <></>
                )}
                {nameVisible ? (
                  <div className="selected_container">
                    {/* <p>Опишите сценарий</p> */}
                    <textarea
                      placeholder="Описание сценария"
                      value={description}
                      onChange={onChangeDescription}
                      className="textarea_v1"
                    />
                  </div>
                ) : (
                  <></>
                )}
                {nameVisible ? (
                  <div className="selected_container">
                    {/* <p>Напишите название сценария</p> */}
                    <ScenariosInpt
                      placeholder="Название сценария"
                      value={name}
                      onChange={onChangeName}
                      style={{ width: "250px" }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {!nameVisible ? (
              <AddBtn
                help="Выбрать инструмент"
                onClick={() => setSelectEvent(!selectEvent)}
              />
            ) : (
              <></>
            )}

            <img
              className="scenarios_filter_play_icon"
              onClick={playScenarios}
              src={playIcon}
              alt=""
            />
          </div>
        </div>
        <ul>
          <li> "build": {JSON.stringify(stateScenarios.build_data)},</li>
          <li> "join": {JSON.stringify(stateScenarios.join_data)},</li>
          <li> "filter": {JSON.stringify(stateScenarios.filter_data)}</li>
          <li> "order": {JSON.stringify({})}</li>
        </ul>
      </div>
    </PageComponent>
  );
});

export default ScenariosCard;
