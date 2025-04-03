import React, { useLayoutEffect, useRef, useState } from "react";
import { BtnBackHeaderPage } from "../../UI/components/BtnBackHeaderPage";
import apiRequest from "../../service/api/api.request";
import iconFullScreen from "../../images/icons/full-screen-icon.png";
import { Button_v1 } from "../../UI/components/Button_v1";
import { PageComponent } from "../PageComponent";

export const CardHTML = ({ html, setHtmlFlagViewer }) => {
  useLayoutEffect(() => {
    const decode = decodeURIComponent(escape(window.atob(html.data)));
    console.log(decode);
    refPreview.current.innerHTML = decode;
    setHtmlFile(decode);
  }, []);
  const [htmlFile, setHtmlFile] = useState("");
  const [valueEditBtn, setValueEditBtn] = useState("Изменить");
  const [htmlName, setHtmlName] = useState(html.name);
  const [fileUpload, setFileUpload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [clsPreview, setClsPreview] = useState("preview_email_container");
  const pressEdit = () => {
    if (!edit) {
      setValueEditBtn("Отменить");
    } else {
      setValueEditBtn("Изменить");
    }
    setEdit(!edit);
  };
  const onChangeSizePreview = () => {
    if (clsPreview === "preview_email_container") {
      setClsPreview("full_screen_preview");
    } else {
      setClsPreview("preview_email_container");
    }
  };

  const changeHtml = (e) => {
    console.log(e.target.value);
    setHtmlFile(e.target.value);
    refPreview.current.innerHTML = e.target.value;
  };
  const saveTemplate = async () => {
    await apiRequest.patchEmail(html.id, {
      name: htmlName,
      data: window.btoa(unescape(encodeURIComponent(htmlFile))),
    });
    setEdit(false);
    await apiRequest.getHTMLTemplateEmail();
    setTimeout(() => {
      setHtmlFlagViewer(false);
    }, 800);
  };

  const refPreview = useRef(null);

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
          <span>Шаблон для email: {htmlName}</span>
        )}
        <div className="btn_edit_container">
          {edit ? <Button_v1 name="Сохранить" onClick={saveTemplate} /> : <></>}
          <Button_v1 onClick={pressEdit} name={valueEditBtn} />
        </div>
      </BtnBackHeaderPage>
      <div className="container_main_flx_btwn">
        <div className="container_block_50">
          {!edit ? (
            <div
              className="textarea_popup_container"
              style={{ height: "auto" }}
            >
              {htmlFile}
            </div>
          ) : (
            <textarea
              value={htmlFile}
              onChange={changeHtml}
              className="textarea_popup_container"
              style={{ height: "-webkit-fill-available" }}
            >
              {htmlFile}
            </textarea>
          )}
        </div>
        <div className="container_block_50">
          <div className="container_email_service">
            <div className={clsPreview}>
              <div className="preview_title_container title_prev_border">
                <h1 className="title_page">Предпросмотр</h1>
                <img
                  className="preview_title_size_icon"
                  src={iconFullScreen}
                  alt=""
                  onClick={onChangeSizePreview}
                />
              </div>
              <div className="preview_email" ref={refPreview}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
