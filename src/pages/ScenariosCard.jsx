import { observer } from "mobx-react-lite";
import { useParams, useLocation, Link, useNavigate } from "react-router";
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
import LoaderScenarios from "../UI/components/LoaderScenarios";
import { SettingsEvent } from "./SettingsEvent";
import { EmailScenariosBlock } from "../components/scenarios/EmailScenariosBlock";

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
    message_id,
    trigger,
    list_to,
    query_params,
    start_date,
    end_date,
  } = location.state || {};

  const navigate = useNavigate();
  const [scenariosIsLoad, setScenariosIsLoad] = useState(false);

  const [nameRequest, setNameRequest] = useState("");
  const [selectVisible, setSelectVisible] = useState(false);
  // const first_data = ["клиент", "пользователь", "посетитель"];
  const [selectEvent, setSelectEvent] = useState(false);
  const [name, setName] = useState("");
  const [typeEventString, setTypeEventString] = useState("");
  const [typeEvent, setTypeEvent] = useState(null);
  const eventData = ["popup", "чат-строка", "рассылка"];
  const [nameVisible, setNameVisible] = useState(false);
  const [description, setDescription] = useState("");
  // const [firstNameScenarios, setFirstNameScenarios] = useState("Выберите");
  const [firstNameEvent, setFirstNameEvent] = useState("Событие");
  const [firstNameEventID, setFirstNameEventID] = useState("Событие");
  const [objReques, setObjReques] = useState({
    type: "",
    name: "",
    event: "",
    id_event: "",
    description: "",
  });

  const [emailReques, setEmailReques] = useState({
    trigger: trigger,
    // "message_id": "string",
    message: "",
    list_to: [],
    // "template": 0,
    query_params: {},
    sent_every_: "",
    interval: 1,
    start_date: "",
    end_date: "",
  });

  const refValueEvent = useRef(null);

  // Дополнительные условия отображения сценария
  const [addUrl, setAddUrl] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addTimeout, setAddTimeout] = useState("");
  const [addClick, setAddClick] = useState("");
  //

  // Сбор фильров
  const autoRequest = async () => {
    try {
      let getKey = false;
      const bodyBuild = JSON.parse(body);
      for (const b of bodyBuild.build) {
        await getSelect(b);
      }
      setSelectVisible(true);
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
          joinID = stateScenarios.offlineScenariosInterface.find((j) => j.current === keyJoin);
          if (joinID) {
            for (let name in bodyBuild.filter[keyJoin]) {
              const filterID = joinID.filter.find((f) => f.name === name);
              if (filterID && filterID.name !== "updated_at") {
                filterID.filter = true;
                filterID.value = bodyBuild.filter[keyJoin][name][0];
                filterID.condition = bodyBuild.filter[keyJoin][name][1];
              }
              stateScenarios.updateValueFilter(joinID.id, name, bodyBuild.filter[keyJoin][name][0], bodyBuild.filter[keyJoin][name][1], joinID);
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setScenariosIsLoad(true);
    }
  };

  const getAutoRequestNameEvent = async () => {
    let res;
    if (event === "popup") {
      res = await apiRequest.getHTMLTemplatePopup();
    }
    if (event === "чат-строка") {
      res = await apiRequest.getHTMLTemplatString();
    }
    if (event === "рассылка") {
      res = await apiRequest.getHTMLTemplateEmail();
    }
    const nameEvent = res.find((e) => e.id === id_event);
    if (nameEvent) {
      setFirstNameEventID(nameEvent.name);
    }
  };

  useLayoutEffect(() => {
    autoRequest();
    setSelectEvent(true);
    setNameVisible(true);
    setName(nameScenarios);
    if (body) {
      setDescription(descriptionScenarios);
      setFirstNameEvent(event);
      setAddUrl(JSON.parse(body).url);
      setAddDate(JSON.parse(body).date);
      setAddTimeout(JSON.parse(body).timeout);
    }

    // objReques = {...objReques, name: nameScenarios, }
    objReques.name = nameScenarios;
    objReques.description = descriptionScenarios;
    objReques.id_event = id_event;

    getAutoRequestNameEvent();
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

  const onChangeSelect = async (e, c) => {
    try {
      stateScenarios.cutData(c.id);
      await getSelect(e.target.value);
    } catch (e) {
      console.error(e);
    }
  };

  // const onChangeSelectNew = async (e) => {
  //   try {
  //     setNameRequest(e.target.value);
  //     await getSelect(e.target.value);
  //     setSelectVisible(true);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  function extractMastIds(obj, result = new Set(), name) {
    if (obj && typeof obj === "object") {
      // if (obj.mast_id) {
      if (obj[`${name}`]) {
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

  const playScenarios = async () => {
    try {
      // function extractMastIds(obj, result = new Set(), name) {
      //   if (obj && typeof obj === "object") {
      //     // if (obj.mast_id) {
      //     if (obj[`${name}`]) {
      //       if (name === "mast_id") {
      //         result.add(` &${obj[`${name}`]},`); // Добавляем mast_id в Set
      //       } else {
      //         result.add(`${obj[`${name}`]}`); // Добавляем mast_id в Set
      //       }
      //     }
      //     // Рекурсивно обходим все ключи объекта
      //     Object.values(obj).forEach((value) => extractMastIds(value, result, name));
      //   }
      //   return result;
      // }

      if (JSON.stringify(stateScenarios.filter_data) === "{}") {
        // return alert("Филтры не настроены");
      }

      let resReq;
      let uniqueMastIds;
      if (objReques.type !== "templates") {
        if (objReques.name === "") {
          // return alert("Имя не задано");
        }
        if (objReques.description === "") {
          // return alert("Описание не задано");
        }
        uniqueMastIds = [
          ...stateScenarios.resultevent.reduce((acc, item) => {
            extractMastIds(item, acc, "mast_id"); // Обрабатываем каждый объект в массиве
            return acc;
          }, new Set()),
        ];
        if (uniqueMastIds.length === 0) {
          return alert("По заданным фильтрам не найдено ни одной почты для отправки");
        }
        // console.log(uniqueMastIds);

        if (event !== "рассылка") {
          resReq = await apiRequest.patchOnlineScenarios(id, {
            type: objReques.type,
            name: objReques.name,
            event: objReques.event,
            body: JSON.stringify({
              build: stateScenarios.build_data,
              join: stateScenarios.join_data,
              filter: stateScenarios.filter_data,
              order: "{}",
              is_active: JSON.parse(body).is_active,
              url: addUrl,
              date: addDate,
              timeout: addTimeout,
              click: addClick,
            }),
            description: objReques.description,
            id_event: Number(objReques.id_event),
            type_user: String(uniqueMastIds).replace(/^ /g, "").replace(/$/g, ","),
          });
        }
      } else {
        uniqueMastIds = [
          ...stateScenarios.resultevent.reduce((acc, item) => {
            extractMastIds(item, acc, "email"); // Обрабатываем каждый объект в массиве
            return acc;
          }, new Set()),
        ];
        if (uniqueMastIds.length === 0) {
          return alert("По заданным фильтрам не найдено ни одной почты для отправки");
        }
        // Когда надо запустить не один раз
        if (emailReques.sent_every_ !== "run_date") {
          // Интервал
          if (emailReques.trigger !== "date") {
            // Цикл (без query params)
            if (JSON.stringify(objReques.query_params) === "{}" || !objReques.query_params) {
              resReq = await apiRequest.emailPostPlaner({
                trigger: "interval",
                message_id: message_id,
                message: objReques.name,
                list_to: uniqueMastIds,
                template: Number(objReques.id_event),
                sent_every_: emailReques.sent_every_,
                interval: Number(emailReques.interval),
                body: JSON.stringify({
                  build: stateScenarios.build_data,
                  join: stateScenarios.join_data,
                  filter: stateScenarios.filter_data,
                  order: "{}",
                }),
                query_params: {},
                // timezone: "UTC+3",
                // start_date: emailReques.start_date,
                // end_date: emailReques.end_date,
              });
            } else {
              // Ищем значение filter
              const dynamicKey = Object.keys(stateScenarios.filter_data)[0];
              stateScenarios.filter_data[dynamicKey].updated_at = ["current_data", ">=", Number(emailReques.interval)];
              // С query params
              resReq = await apiRequest.emailPostPlaner({
                trigger: "interval",
                message_id: message_id,
                message: objReques.name,
                // list_to: uniqueMastIds,
                query_params: stateScenarios.filter_data,
                template: Number(objReques.id_event),
                sent_every_: "days",
                interval: Number(emailReques.interval),
                body: JSON.stringify({
                  build: stateScenarios.build_data,
                  join: stateScenarios.join_data,
                  filter: stateScenarios.filter_data,
                  order: "{}",
                }),
                // timezone: "UTC+3",
                // start_date: emailReques.start_date,
                // end_date: emailReques.end_date,
              });
            }
          } else {
            // cron не используется
            // resReq = await apiRequest.emailPostPlaner({
            //   trigger: emailReques.trigger,
            //   // "message_id": "string",
            //   message: objReques.name,
            //   list_to: uniqueMastIds,
            //   template: Number(objReques.id_event),
            //   sent_every_: emailReques.sent_every_,
            //   interval: Number(emailReques.interval),
            //   start_date: emailReques.start_date,
            //   end_date: emailReques.end_date,
            //   body: JSON.stringify({
            //     build: stateScenarios.build_data,
            //     join: stateScenarios.join_data,
            //     filter: stateScenarios.filter_data,
            //     order: "{}",
            //   }),
            //   // timezone: "UTC+3",
            // });
          }
        } else {
          // Когда запускаем один раз
          resReq = await apiRequest.emailPostPlaner({
            trigger: "date",
            message_id: message_id,
            message: objReques.name,
            list_to: uniqueMastIds,
            // list_to: ["support1@mact.ru"],
            template: Number(objReques.id_event),
            sent_every_: emailReques.sent_every_,
            interval: emailReques.start_date,
            // start_date: emailReques.start_date,
            // end_date: emailReques.end_date,
          });
        }
      }
      if (resReq) {
        setTimeout(() => {
          navigate("/scenarios");
        }, 400);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const visibleSelectedElemets = async () => {
    if (stateScenarios.resultevent !== "Нет данных") {
      let uniqueMastIds;
      if (objReques.type !== "templates") {
        uniqueMastIds = [
          ...stateScenarios.resultevent.reduce((acc, item) => {
            extractMastIds(item, acc, "mast_id"); // Обрабатываем каждый объект в массиве
            return acc;
          }, new Set()),
        ];
      } else {
        uniqueMastIds = [
          ...stateScenarios.resultevent.reduce((acc, item) => {
            extractMastIds(item, acc, "email"); // Обрабатываем каждый объект в массиве
            return acc;
          }, new Set()),
        ];
      }
      console.log("Элементы удовлетворяющие фильтру =====>", uniqueMastIds);
      console.log("Элементы выгруженные с БД =====>", toJS(stateScenarios.resultevent));
    } else {
      console.log("Нет данных, настройте фильтр");
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
      setObjReques(objReques, ...(objReques.event = value), (objReques.type = "routing"));
      if (res) {
        setTypeEvent(res);
      }
    }
    if (value === "чат-строка") {
      const res = await apiRequest.getHTMLTemplatString();
      setObjReques(objReques, ...((objReques.event = value), (objReques.type = "strings")));
      if (res) {
        setTypeEvent(res);
      }
    }
    if (value === "рассылка") {
      const res = await apiRequest.getHTMLTemplatString();
      setObjReques(objReques, ...((objReques.event = value), (objReques.type = "templates")));
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
    }
    setNameVisible(true);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
    setObjReques({ ...objReques, name: e.target.value });
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    setObjReques({ ...objReques, description: e.target.value });
  };

  const filterBarRef = useRef(null);
  if (scenariosIsLoad) {
    return (
      <PageComponent>
        <div className="scenarios_container">
          <Link to={`/scenarios`}>
            <BtnBackHeaderPage />
          </Link>
          <div className="scenarios_container">
            <label>
              <span>Выбрано: {stateScenarios.resultevent !== "Нет данных" ? stateScenarios.resultevent.length : 0}</span>
              <span className="btn_view_selected_element" onClick={visibleSelectedElemets}>
                вывести в консоль
              </span>
            </label>
            <div className="scenarios_container_filter">
              <div className="scenarios_filter_bar" ref={filterBarRef}></div>

              <div className="scenarios_filter_container scenarios_filter_span">
                <div className="scenarios_filter_span">
                  <div className="select_container">
                    <select className="inpt_v1">
                      <option>
                        {/* {nameRequest} */}
                        {stateScenarios.build_data[0]}
                      </option>
                    </select>
                    <img className="icon_reload" src={iconRefresh} alt="Сбросить" onClick={clearScenarios} />
                  </div>
                </div>
                <div>
                  <FiltersItemComponent id={0} c={stateScenarios.offlineScenariosInterface[0]} />
                </div>
              </div>

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
                  <SelectedScenarios refValue={refValueEvent} firstName={firstNameEvent} data={eventData} onChange={onChangeEvent} />
                  {typeEvent !== null ? (
                    <SelectedScenariosName data={typeEvent} firstName={firstNameEventID} onChange={onChangeEventID} cls="inpt_v1" />
                  ) : (
                    <></>
                  )}
                  {event !== "рассылка" ? (
                    <SettingsEvent
                      url={addUrl}
                      onChangeUrl={(e) => setAddUrl(e.target.value)}
                      click={addClick}
                      onChangeClick={(e) => setAddClick(e.target.value)}
                      date={addDate}
                      onChangeDate={(e) => setAddDate(e.target.value)}
                      timeout={addTimeout}
                      onChangeTimeout={(e) => setAddTimeout(e.target.value)}
                    />
                  ) : (
                    <></>
                  )}

                  {nameVisible && event !== "рассылка" ? (
                    <div className="selected_container">
                      {/* <p>Опишите сценарий</p> */}
                      <textarea placeholder="Описание сценария" value={description} onChange={onChangeDescription} className="textarea_v1" />
                    </div>
                  ) : (
                    <></>
                  )}
                  {nameVisible && event === "рассылка" ? (
                    <EmailScenariosBlock
                      emailReques={emailReques}
                      setEmailReques={setEmailReques}
                      _new={{
                        trigger: trigger,
                        query_params: query_params,
                        start_date: start_date,
                        end_date: end_date,
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  {nameVisible ? (
                    <div className="selected_container">
                      {/* <p>Напишите название сценария</p> */}
                      <ScenariosInpt placeholder="Название сценария" value={name} onChange={onChangeName} style={{ width: "250px" }} />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {!nameVisible ? <AddBtn help="Выбрать инструмент" onClick={() => setSelectEvent(!selectEvent)} /> : <></>}

              <img className="scenarios_filter_play_icon" onClick={playScenarios} src={playIcon} alt="" />
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
  } else {
    return <LoaderScenarios />;
  }
});

export default ScenariosCard;
