import React, { useRef, useState } from "react";
import { BtnBackHeaderPage } from "../../UI/components/BtnBackHeaderPage";
import { AddBtn } from "../../UI/components/AddBtn";
import saveIcon from "../../images/icons/save.png";
import { observer } from "mobx-react-lite";
import SelectedScenarios from "../../UI/components/scenarios/SelectedScenarios";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import apiRequest from "../../service/api/api.request";
import appState from "../../service/state/app.state";
import SelectedScenariosName from "../../UI/components/scenarios/SelectedScenariosName";

const NewScenariosOnline = observer(({ setNewScenariosOnline }) => {
  const typeData = ["url", "click"];
  const eventData = ["popup", "чат-строка"];
  const [infoBody, setInfoBody] = useState("Выберите действие");
  const [objReques, setObjReques] = useState({
    type: "",
    name: "",
    event: "",
    body: "",
    id_event: "",
  });
  const [typeEvent, setTypeEvent] = useState(null);
  const [typeEventString, setTypeEventString] = useState("");

  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [indexBtn, setIndexBtn] = useState(0);
  const filterBarRef = useRef(null);

  const showSelect = () => {
    setIndexBtn(indexBtn + 1);
  };

  const onChangeBody = (e) => {
    setBody(e.target.value);
    setObjReques(objReques, ...(objReques.body = e.target.value));
  };
  const onChangeName = (e) => {
    setName(e.target.value);
    setObjReques(objReques, ...(objReques.name = e.target.value));
  };

  const onChangeSelect = (e) => {
    const value = e.target.value;
    if (value === "url" || value === "click") {
      setObjReques(objReques, ...(objReques.type = value));
      if (value === "url") {
        setInfoBody(
          "Введите название или часть названия страницы из url сайта. Пример: https://gk-mact.ru/kassy-atol/ Чтобы сработало событие при посещение страницы АТОЛ, введите atol или kassy-atol. Внимание! Если введёте kassy-atol, событие не сработает в карточке модели ККТ АТОЛ, так имя в строке будет отличаться."
        );
      }
      if (value === "click") {
        setInfoBody(
          "Введите id элемента на сайте, это может быть любой html-элемент. Внимание! Если у вас более одного элемента с данным id, то событие может не сработать, id событийного элемента должно быть уникальным"
        );
      }
    }
    // if (value === "popup" || value === "чат-строка") {
    //   setObjReques(objReques, ...(objReques.event = value));
    // }
  };

  const saveScenarios = async () => {
    console.log(objReques);
    if (objReques.type === "") {
      return alert("Не выбран тип сценария");
    }
    if (objReques.name === "") {
      return alert("Не задано название сценария");
    }
    if (objReques.body === "") {
      return alert("Не указана строка события");
    }
    if (objReques.id_event === "") {
      return alert("Не выбран шаблон из списка");
    }
    const res = await apiRequest.postOnlineScenarios({
      type: objReques.type,
      name: objReques.name,
      event: objReques.event,
      body: objReques.body,
      id_event: Number(objReques.id_event),
    });
    if (res.success) {
      setNewScenariosOnline(false);
    }
  };

  const onChangeEvent = async (e) => {
    const value = e.target.value;
    setTypeEventString(value);
    if (value === "popup") {
      const res = await apiRequest.getHTMLTemplatePopup();
      setObjReques(objReques, ...(objReques.event = value));
      if (res) {
        console.log(res);
        setTypeEvent(res);
      }
    }
  };

  const onChangeEventID = async (e) => {
    console.log(e, objReques);
    const resID =
      typeEventString === "popup"
        ? appState.templatesHTMLPopup.find((p) => p.name === e.target.value)
        : appState.templatesHTMLString.find((p) => p.name === e.target.value);
    if (resID) {
      setObjReques(objReques, ...(objReques.id_event = String(resID.id)));
      console.log(resID);
    }
  };

  return (
    <div className="scenarios_container">
      <BtnBackHeaderPage onClick={() => setNewScenariosOnline(false)} />
      <div className="scenarios_container">
        <div className="scenarios_container_filter">
          <div className="scenarios_filter_bar" ref={filterBarRef}>
            <div className="selected_container">
              <p>
                Выберите событие, которое должно произойти на сайте: url -
                посещение определённой страницы, click - клик по элементу на
                сайте
              </p>
              <SelectedScenarios
                firstName="Действие"
                data={typeData}
                onChange={onChangeSelect}
              />
            </div>
            {indexBtn >= 1 ? (
              <div className="selected_container">
                <p>{infoBody}</p>
                <ScenariosInpt
                  placeholder=""
                  value={body}
                  onChange={onChangeBody}
                />
              </div>
            ) : (
              <></>
            )}
            {indexBtn >= 2 ? (
              <div className="selected_container">
                <p>
                  Выберите, какое событие произойдёт на сайте, если пользователь
                  выполнит указанные действия из сценария
                </p>
                <div className="event_selected_container">
                  <SelectedScenarios
                    firstName="Событие"
                    data={eventData}
                    onChange={onChangeEvent}
                  />
                  {typeEvent !== null ? (
                    <SelectedScenariosName
                      data={typeEvent}
                      onChange={onChangeEventID}
                      cls="inpt_v1 event_selected"
                    />
                  ) : (
                    // <select
                    //   onChange={onChangeEventID}
                    //   className="inpt_v1 event_selected"
                    // >
                    //   <option defaultValue hidden></option>
                    //   {typeEvent.map((c) => (
                    //     <option c={c} key={c.id}>
                    //      {c.name}
                    //     </option>
                    //   ))}
                    // </select>
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
            {indexBtn >= 3 ? (
              <div className="selected_container">
                <p>Напишите название скрипта</p>
                <ScenariosInpt
                  placeholder=""
                  value={name}
                  onChange={onChangeName}
                />
              </div>
            ) : (
              <></>
            )}
            {indexBtn < 3 ? (
              <AddBtn onClick={showSelect} />
            ) : (
              <>
                {/* {" "}
                <img
                  className="scenarios_filter_play_icon"
                  onClick={saveScenarios}
                  src={playIcon}
                  alt=""
                />{" "} */}
                <img
                  className="scenarios_filter_play_icon"
                  onClick={saveScenarios}
                  src={saveIcon}
                  alt=""
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewScenariosOnline;
