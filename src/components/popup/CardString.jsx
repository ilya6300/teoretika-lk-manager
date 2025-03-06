import React, { useLayoutEffect, useRef, useState } from "react";
import { BtnBackHeaderPage } from "../../UI/components/BtnBackHeaderPage";
import { Button_v1 } from "../../UI/components/Button_v1";
import { LidBotClone } from "./LidBotClone";
import iconPlay from "../../images/icons/play.png";
import apiRequest from "../../service/api/api.request";

export const CardPopup = ({ html, setHtmlFlagViewer }) => {
  const [htmlString, setHtmlString] = useState("");
  const [htmlName, setHtmlName] = useState(html.name);
  const [edit, setEdit] = useState(false);
  const [valueEditBtn, setValueEditBtn] = useState("Изменить");
  const refPreview = useRef(null);
  const refPopup = useRef(null);
  const refScript = useRef(null);
  useLayoutEffect(() => {
    const decode = JSON.parse(
      decodeURIComponent(escape(window.atob(html.data)))
    );
    const handlerHTML = async () => {
      const string = await objID(decode, "Строка чат бота");
      setHtmlString(string.replace(/<div>|<\/div>/gm, ""));
    };
    handlerHTML();
  }, []);

  const objID = async (obj, name) => {
    // Функция поиска нужного id
    const nameID = obj.find((n) => n.name === name);
    if (nameID) {
      return decodeURIComponent(escape(window.atob(nameID.data)));
    }
  };

  const pressEdit = () => {
    if (!edit) {
      setValueEditBtn("Отменить");
    } else {
      setValueEditBtn("Изменить");
    }
    setEdit(!edit);
  };

  const changeHTMLString = (e) => {
    setHtmlString(e.target.value);
  };

  const saveTemplate = async () => {
    const string = window.btoa(
      unescape(encodeURIComponent(`<div>${htmlString}</div>`))
    );
    apiRequest.patchPopup(html.id, {
      name: htmlName,
      data: window.btoa(
        unescape(
          encodeURIComponent(`[
      {
        "name": "Строка чат бота",
        "data": "${string}"
      },
    ]`)
        )
      ),
    });
    setEdit(false);
  };

  return (
    <div>
      <BtnBackHeaderPage onClick={() => setHtmlFlagViewer(false)}>
        {edit ? (
          <div className="btn_edit_container">
            <span>Введите новое название шаблона</span>
            <input
              className="inpt_popup_edit_name"
              value={htmlName}
              onChange={(e) => setHtmlName(e.target.value)}
            />
          </div>
        ) : (
          <span>Шаблон popup: {htmlName}</span>
        )}
        <div className="btn_edit_container">
          {edit ? <Button_v1 name="Сохранить" onClick={saveTemplate} /> : <></>}
          <Button_v1 onClick={pressEdit} name={valueEditBtn} />
        </div>
      </BtnBackHeaderPage>
      <div className="container_main_flx_btwn">
        <div className="container_block_50">
          <div className="item_popup_container">
            <div className="item_popup_name">
              Строка. Введите информацию, которая будет отображаться над лид
              ботом. Внимание! Не указывайте html-разметку
            </div>
            {edit ? (
              <input
                className="inpt_popup_string"
                onChange={changeHTMLString}
                value={htmlString}
                type="text"
                placeholder="Строка над лид ботом"
              />
            ) : (
              <div className="inpt_popup_string" style={{ border: "none" }}>
                {htmlString}
              </div>
            )}
          </div>
        </div>
        <div
          ref={refPreview}
          className="preview_email container_block_50 emulator_site"
        >
          <div
            ref={refPopup}
            className="preview_email_popup popup_container"
          ></div>
          <div
            ref={refScript}
            className="preview_email_script popup_container"
          ></div>
          <LidBotClone string={htmlString} />
        </div>
      </div>
    </div>
  );
};
