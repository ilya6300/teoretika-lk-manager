import React, { useRef, useState } from "react";
import { PageComponent } from "../components/PageComponent";
import { BtnBackHeaderPage } from "../UI/components/BtnBackHeaderPage";
import { Button_v1 } from "../UI/components/Button_v1";
import apiRequest from "../service/api/api.request";
import appState from "../service/state/app.state";
import { AddBtn } from "../UI/components/AddBtn";
import SelectedScenarios from "../UI/components/scenarios/SelectedScenarios";
import ScenariosInpt from "../UI/components/scenarios/ScenariosInpt";
import SelectedScenariosName from "../UI/components/scenarios/SelectedScenariosName";

const CardOnlineScenarios = ({ card, setCardFlag }) => {
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
    const res = await apiRequest.patchOnlineScenarios(card.id, {
      type: objReques.type,
      name: objReques.name,
      event: objReques.event,
      body: objReques.body,
      id_event: Number(objReques.id_event),
    });
    if (res.success) {
      setEdit(false);
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
  const [edit, setEdit] = useState(false);
  const [valueEditBtn, setValueEditBtn] = useState("Изменить");
  const pressEdit = () => {
    if (!edit) {
      setValueEditBtn("Отменить");
    } else {
      setValueEditBtn("Изменить");
    }
    setEdit(!edit);
  };
  //   const saveScenarios = () => {};
  if (card !== null) {
    return (
      <PageComponent title={card.name}>
        <BtnBackHeaderPage onClick={() => setCardFlag(false)}>
          {" "}
          <div className="btn_edit_container">
            {edit ? (
              <Button_v1 name="Сохранить" onClick={saveScenarios} />
            ) : (
              <></>
            )}
            <Button_v1 onClick={pressEdit} name={valueEditBtn} />
          </div>
        </BtnBackHeaderPage>
        {!edit ? (
          <div>
            Сценарий произойдёт когда пользователь на сайте
            {card.type === "url"
              ? " посетит страницу "
              : " произведёт клик по объекту с id "}
            {card.body}. Если пользователь выполнит условие, то ему{" "}
            {card.event === "popup"
              ? " будет показано всплывающее окно"
              : " в чат боте отобразиться строка"}
          </div>
        ) : (
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
                      Выберите, какое событие произойдёт на сайте, если
                      пользователь выполнит указанные действия из сценария
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
                {indexBtn < 3 ? <AddBtn onClick={showSelect} /> : <></>}
              </div>
            </div>
          </div>
        )}
      </PageComponent>
    );
  }
};

export default CardOnlineScenarios;
