import React, { useLayoutEffect, useRef, useState } from "react";
import { BtnBackHeaderPage } from "../../UI/components/BtnBackHeaderPage";
import { Button_v1 } from "../../UI/components/Button_v1";
import { LidBotClone } from "./LidBotClone";
import iconPlay from "../../images/icons/play.png";
import apiRequest from "../../service/api/api.request";

export const CardPopup = ({ html, setHtmlFlagViewer }) => {
  const [htmlPopup, setHtmlPopup] = useState("");
  // const [htmlString, setHtmlString] = useState("");
  const [htmlScript, setHtmlScript] = useState("");
  const [htmlName, setHtmlName] = useState(html.name);
  const [edit, setEdit] = useState(false);
  const [valueEditBtn, setValueEditBtn] = useState("Изменить");
  const refPreview = useRef(null);
  const refPopup = useRef(null);
  const refScript = useRef(null);
  useLayoutEffect(() => {
    try {
      const handlerHTML = async () => {
        // const string = await objID(html.string_data);
        const popup = await objID(html.data);
        const script = await objID(html.script_data);
        // setHtmlString(string.replace(/<div>|<\/div>/gm, ""));
        setHtmlPopup(popup);
        setHtmlScript(script);
        // console.log(string, popup, script);
        refPopup.current.innerHTML = popup;
      };
      handlerHTML();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const objID = async (obj) => {
    return decodeURIComponent(escape(window.atob(obj)));
  };

  const pressEdit = () => {
    if (!edit) {
      setValueEditBtn("Отменить");
    } else {
      setValueEditBtn("Изменить");
    }
    setEdit(!edit);
  };

  const changeHTMLPopup = (e) => {
    setHtmlPopup(e.target.value);
    refPopup.current.innerHTML = e.target.value;
  };
  // const changeHTMLString = (e) => {
  //   setHtmlString(e.target.value);
  // };
  const changeScript = (e) => {
    setHtmlScript(e.target.value);
  };

  const playScript = () => {
    const checkTag = /<script>/.test(htmlScript);
    if (checkTag) {
      const scriptEl = document
        .createRange()
        .createContextualFragment(htmlScript);
      refPreview.current.append(scriptEl);
    } else {
      const scriptEl = document
        .createRange()
        .createContextualFragment(`<script>${htmlScript}</script>`);
      refPreview.current.append(scriptEl);
    }
  };

  const saveTemplate = async () => {
    apiRequest.patchPopup(html.id, {
      name: htmlName,
      data: window.btoa(unescape(encodeURIComponent(htmlPopup))),
      // string_data: window.btoa(
      //   unescape(encodeURIComponent(`<div>${htmlString}</div>`))
      // ),
      script_data: /<script>/.test(htmlScript)
        ? window.btoa(unescape(encodeURIComponent(htmlScript)))
        : window.btoa(
            unescape(encodeURIComponent(`<script>${htmlScript}</script>`))
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
          {/* <div className="item_popup_container">
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
          </div> */}
          <div className="item_popup_container">
            <div className="item_popup_name">
              Всплывающее окно. Введите html и css код, который будет отображать
              всплывающее окошко. Внимание! Код указывайте по правилам html
              разметки - {"<div>... ваш код ... </div>"}
            </div>
            {edit ? (
              <textarea
                className="textarea_popup_container"
                onChange={changeHTMLPopup}
                value={htmlPopup}
                type="text"
                placeholder="Строка над лид ботом"
              />
            ) : (
              <div
                className="textarea_popup_container"
                style={{ border: "none" }}
              >
                {htmlPopup}
              </div>
            )}
          </div>
          <div className="item_popup_container">
            <div className="item_popup_name">
              Скрипт. Введите код на JavaScript который будет срабатывать на
              сайте. Внимание! Не указывайте открывающийся и закрывающийся тэг{" "}
              {"<script> и </script>"}. Он будет передан автоматически.
            </div>
            <div className="textarea_script_popup_container">
              {edit ? (
                <textarea
                  className="textarea_script_popup"
                  onChange={changeScript}
                  value={htmlScript.replace(/<script>|<\/script>/gm, "")}
                  type="text"
                  placeholder="Строка над лид ботом"
                />
              ) : (
                <div
                  className="textarea_script_popup"
                  style={{ border: "none" }}
                >
                  {htmlScript.replace(/<script>|<\/script>/gm, "")}
                </div>
              )}

              <button
                className="btn_icon_play_script_container"
                onClick={playScript}
              >
                <img
                  className="btn_icon_play_script"
                  src={iconPlay}
                  alt="Воспроизвести скрипт"
                />
              </button>
            </div>
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
          {/* <LidBotClone string={htmlString} /> */}
        </div>
      </div>
    </div>
  );
};
