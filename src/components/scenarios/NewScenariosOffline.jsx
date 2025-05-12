import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PageComponent } from "../PageComponent";
import { AddBtn } from "../../UI/components/AddBtn";
import { BtnBackHeaderPage } from "../../UI/components/BtnBackHeaderPage";
import apiRequest from "../../service/api/api.request";
import SelectedScenarios from "../../UI/components/scenarios/SelectedScenarios";
import stateScenarios from "../../service/state/state.scenarios";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import playIcon from "../../images/icons/save.png";
import CurrentElementOffline from "./CurrentElementOffline";
import FiltersItemComponent from "./FiltersItemComponent";
import iconRefresh from "../../images/icons/reload.png";
import appState from "../../service/state/app.state";
import SelectedScenariosName from "../../UI/components/scenarios/SelectedScenariosName";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import { EmailScenariosBlock } from "./EmailScenariosBlock";

const NewScenariosOffline = observer(({ setNewScenariosOffline }) => {
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
  const [objReques, setObjReques] = useState({
    type: "",
    name: "",
    event: "",
    id_event: "",
    description: "",
  });
  const [planer, setPalner] = useState(false);
  const [emailReques, setEmailReques] = useState({
    trigger: "",
    // "message_id": "string",
    message: "",
    list_to: [],
    // "template": 0,
    query_params: {},
    sent_every_: "",
    interval: 0,
    start_date: "",
    end_date: "",
    // "timezone": "string"
  });

  useLayoutEffect(() => {
    stateScenarios.resetData("join_data");
    showSelec();
  }, []);

  const getSelect = async (name) => {
    try {
      const resSelect = await apiRequest.getFilterJoin(name);
      if (resSelect.current === undefined || resSelect.current === "new") {
        // console.log("resSelect", resSelect);
        // return;
      } else if (resSelect.current !== undefined) {
        // console.log(resSelect["join"]);
        let joinData = [];
        for (let key in resSelect["join"]) {
          joinData = [...joinData, key];
        }

        if (!stateScenarios.offlineScenariosInterface.length) {
          stateScenarios.pushOfflineScenariosInterface(resSelect.current, resSelect["join"], resSelect["filter"]);
          stateScenarios.addJoinData(resSelect.current, name);
        } else {
          stateScenarios.pushOfflineScenariosInterface(resSelect.current, resSelect["join"], resSelect["filter"]);

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

  const showSelec = async (name) => {
    // console.log(name);
    // let select; // ?
    try {
      //   if (stateScenarios.offlineScenariosInterface.length === 0) {
      //     select = ""; // ?
      //   } else {
      //     // console.log(nameRequest);
      //     select = nameRequest; // ?
      //   }
      // console.log(
      //   nameRequest,
      //   select,
      //   stateScenarios.offlineScenariosInterface[
      //     stateScenarios.offlineScenariosInterface.length - 1
      //   ]
      // );
      await getSelect(nameRequest);
    } catch (e) {
      console.error(e);
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

  const onChangePlaner = (e) => {
    if (e.target.value === "Планировщик") {
      setPalner(true);
    } else {
      setPalner(false);
    }
  };

  const playScenarios = async () => {
    try {
      // console.log(
      //   toJS(stateScenarios.offlineScenariosInterface),
      //   toJS(stateScenarios.join_data),
      //   toJS(stateScenarios.resultevent)
      // );
      function extractMastIds(obj, result = new Set(), name) {
        if (obj && typeof obj === "object") {
          // if (obj.mast_id) {
          if (obj[`${name}`]) {
            // console.log(obj["mast_id"]);
            if (name === "mast_id") {
              result.add(` &${obj[`${name}`]},`); // Добавляем mast_id в Set
            } else {
              result.add(`${obj[`${name}`]}`); // Добавляем mast_id в Set
            }
          }
          // Рекурсивно обходим все ключи объекта
          Object.values(obj).forEach((value) => extractMastIds(value, result, name));
        }
        return result;
      }
      // console.log(1);
      // Собираем все уникальные mast_id

      // console.log(2);

      if (JSON.stringify(stateScenarios.filter_data) === "{}") {
        // return alert("Филтры не настроены");
      }

      if (objReques.type !== "templates") {
        if (objReques.name === "") {
          // return alert("Имя не задано");
        }
        if (objReques.description === "") {
          // return alert("Описание не задано");
        }
        const uniqueMastIds = [
          ...stateScenarios.resultevent.reduce((acc, item) => {
            extractMastIds(item, acc, "mast_id"); // Обрабатываем каждый объект в массиве
            return acc;
          }, new Set()),
        ];
        console.log(uniqueMastIds);
        const resReq = await apiRequest.postOnlineScenarios({
          type: objReques.type,
          name: objReques.name,
          event: objReques.event,
          body: JSON.stringify({
            build: stateScenarios.build_data,
            join: stateScenarios.join_data,
            filter: stateScenarios.filter_data,
            order: "{}",
            is_active: true,
          }),
          description: objReques.description,
          id_event: Number(objReques.id_event),
          type_user: String(uniqueMastIds).replace(/^ /g, "").replace(/$/g, ","),
        });
        if (resReq) {
          setTimeout(() => {
            setNewScenariosOffline(false);
          }, 400);
        }
      } else if (objReques.type === "templates" && planer) {
        const uniqueMastIds = [
          ...stateScenarios.resultevent.reduce((acc, item) => {
            extractMastIds(item, acc, "email"); // Обрабатываем каждый объект в массиве
            return acc;
          }, new Set()),
        ];
        console.log(uniqueMastIds);
        setEmailReques({ ...emailReques, list_to: uniqueMastIds });
        // console.log({
        //   trigger: emailReques.trigger,
        //   // "message_id": "string",
        //   message: objReques.name,
        //   list_to: uniqueMastIds,
        //   template: objReques.id_event,
        //   sent_every_: emailReques.sent_every_,
        //   interval: emailReques.interval,
        //   start_date: emailReques.start_date,
        //   end_date: emailReques.end_date,
        // });
        if (emailReques.trigger === "") {
          return alert("Не выбран тип периода");
        }
        if (objReques.name === "") {
          return alert("Не указан заголовок");
        }
        if (emailReques.list_to.length === 0) {
          // return alert("Нет email удовлетворяющему фильтру");
        }
        if (emailReques.sent_every_ === "") {
          // return alert("Не выбран период");
        }
        if (emailReques.trigger === "interval" && emailReques.interval === 0) {
          return alert("Интервал не может быть нулевой");
        }
        if (emailReques.start_date === "") {
          return alert("Не выбран дата на начала");
        }
        if (emailReques.end_date === "" && emailReques.trigger !== "date") {
          return alert("Не выбран дата на окончания");
        }
        if (objReques.id_event === "") {
          return alert("Не выбран шаблон");
        }
        console.log(objReques, emailReques);
        let resReq;
        if (emailReques.sent_every_ !== "run_date") {
          resReq = await apiRequest.emailPostPlaner({
            trigger: emailReques.trigger,
            // "message_id": "string",
            message: objReques.name,
            list_to: uniqueMastIds,
            template: Number(objReques.id_event),
            sent_every_: emailReques.sent_every_,
            interval: Number(emailReques.interval),
            start_date: emailReques.start_date,
            end_date: emailReques.end_date,
          });
        } else {
          resReq = await apiRequest.emailPostPlaner({
            trigger: emailReques.trigger,
            // "message_id": "string",
            message: objReques.name,
            // list_to: uniqueMastIds,
            list_to: ["support1@mact.ru"],
            template: Number(objReques.id_event),
            sent_every_: emailReques.sent_every_,
            interval: 1,
            start_date: emailReques.start_date,
            // end_date: emailReques.end_date,
          });
        }

        if (resReq) {
          setTimeout(() => {
            setNewScenariosOffline(false);
          }, 400);
        }
      } else if (objReques.type === "templates" && !planer) {
        const uniqueMastIds = [
          ...stateScenarios.resultevent.reduce((acc, item) => {
            extractMastIds(item, acc, "email"); // Обрабатываем каждый объект в массиве
            return acc;
          }, new Set()),
        ];
        console.log(uniqueMastIds);
        if (objReques.name === "") {
          return alert("Не указан заголовок");
        }
        if (emailReques.list_to.length === 0) {
          // return alert("Нет email удовлетворяющему фильтру");
        }
        if (objReques.id_event === "") {
          return alert("Не выбран шаблон");
        }
        const resReq = await apiRequest.emailPostOne({
          message: objReques.name,
          list_to: uniqueMastIds,
          // list_to: ["support1@mact.ru"],
          template: Number(objReques.id_event),
        });
        if (resReq) {
          setTimeout(() => {
            alert("Сообщение будет отправлено в порядке очереди");
            setNewScenariosOffline(false);
          }, 400);
        }
        // console.log({
        //   message: objReques.name,
        //   list_to: uniqueMastIds,
        //   template: objReques.id_event,
        // query_params: {},
        // });
      }
      // setTimeout(() => {

      // }, 800);
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
    const value = e.target.value;
    setTypeEventString(value);
    if (value === "popup") {
      const res = await apiRequest.getHTMLTemplatePopup();
      setObjReques({ ...objReques, event: value, type: "routing" });
      if (res) {
        setTypeEvent(res);
      }
    }
    if (value === "чат-строка") {
      const res = await apiRequest.getHTMLTemplatString();
      setObjReques({ ...objReques, event: value, type: "strings" });
      if (res) {
        setTypeEvent(res);
      }
    }
    if (value === "рассылка") {
      const res = await apiRequest.getHTMLTemplateEmail();
      setObjReques({ ...objReques, event: value, type: "templates" });
      if (res) {
        setTypeEvent(res);
      }
    }
  };
  const onChangeEventID = async (e) => {
    const resID =
      typeEventString === "popup"
        ? appState.templatesHTMLPopup.find((p) => p.name === e.target.value)
        : typeEventString === "чат-строка"
        ? appState.templatesHTMLString.find((p) => p.name === e.target.value)
        : appState.templatesHTMLEmail.find((p) => p.name === e.target.value);
    if (resID) {
      setObjReques(objReques, ...(objReques.id_event = String(resID.id)));
      setObjReques({ ...objReques, id_event: String(resID.id) });
    }
    // if (typeEventString !== "рассылка") {
    setNameVisible(true);
    // }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
    setObjReques({ ...objReques, name: e.target.value });
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    // setObjReques(objReques, ...(objReques.description = e.target.value));
    setObjReques({ ...objReques, description: e.target.value });
  };

  const filterBarRef = useRef(null);
  return (
    <div className="scenarios_container">
      <BtnBackHeaderPage onClick={() => setNewScenariosOffline(false)} />
      <div className="scenarios_container">
        <span>Выбрано: {stateScenarios.resultevent !== "Нет данных" ? stateScenarios.resultevent.length : 0}</span>
        <div className="scenarios_container_filter">
          <div className="scenarios_filter_bar" ref={filterBarRef}></div>
          {!selectVisible ? (
            <SelectedScenarios firstName="Выберите" data={first_data} onChange={onChangeSelectNew} />
          ) : (
            <div className="scenarios_filter_container scenarios_filter_span">
              <div className="scenarios_filter_span">
                <div className="select_container">
                  <select className="inpt_v1">
                    <option defaultValue>{nameRequest}</option>
                  </select>
                  <img className="icon_reload" src={iconRefresh} alt="Сбросить" onClick={clearScenarios} />
                </div>
              </div>
              <div>
                <FiltersItemComponent id={0} c={stateScenarios.offlineScenariosInterface[0]} />
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
            <>
              <SelectedScenarios firstName="Событие" data={eventData} onChange={onChangeEvent} />
              {typeEvent !== null ? <SelectedScenariosName data={typeEvent} onChange={onChangeEventID} cls="inpt_v1" /> : <></>}
              {objReques.type === "templates" ? (
                <>
                  <SelectedScenarios firstName="Тип отправки" data={["Разовая отправка", "Планировщик"]} onChange={onChangePlaner} />
                  {planer ? <EmailScenariosBlock emailReques={emailReques} setEmailReques={setEmailReques} /> : <></>}
                </>
              ) : (
                <></>
              )}
              {nameVisible ? (
                <>
                  {/* <p>Опишите сценарий</p> */}
                  <textarea placeholder="Описание сценария" value={description} onChange={onChangeDescription} className="textarea_v1" />
                </>
              ) : (
                <></>
              )}
              {nameVisible ? (
                <>
                  {/* <p>Напишите название сценария</p> */}
                  <ScenariosInpt
                    placeholder={objReques.type !== "templates" ? "Название сценария" : "Название рассылки"}
                    value={name}
                    onChange={onChangeName}
                    style={{ width: "250px" }}
                  />
                </>
              ) : (
                <></>
              )}
              {nameVisible && objReques.name ? <img className="scenarios_filter_play_icon" onClick={playScenarios} src={playIcon} alt="" /> : <></>}
            </>
          ) : (
            <></>
          )}
          {!nameVisible ? <AddBtn help="Выбрать инструмент" onClick={() => setSelectEvent(!selectEvent)} /> : <></>}
        </div>
      </div>
      <ul>
        <li> "build": {JSON.stringify(stateScenarios.build_data)},</li>
        <li> "join": {JSON.stringify(stateScenarios.join_data)},</li>
        <li> "filter": {JSON.stringify(stateScenarios.filter_data)}</li>
        <li> "order": {JSON.stringify({})}</li>
      </ul>
    </div>
  );
});

export default NewScenariosOffline;
