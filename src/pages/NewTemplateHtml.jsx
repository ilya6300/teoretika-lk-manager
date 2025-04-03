import React, { useRef, useState } from "react";
import { PageComponent } from "../components/PageComponent";
import iconFullScreen from "../images/icons/full-screen-icon.png";
import { Button_v1 } from "../UI/components/Button_v1";
import apiRequest from "../service/api/api.request";
import { useNavigate } from "react-router";

export const NewTemplateHtml = () => {
  const [clsPreview, setClsPreview] = useState("preview_email_container");
  const refPreview = useRef(null);
  const refFile = useRef(null);
  const refDropArea = useRef(null);
  const [fileUpload, setFileUpload] = useState(false);
  const [clsDrop, setClsDrop] = useState("grey_text_body drop_html_container");
  const [name, setName] = useState("");
  const [html, setHtml] = useState("");
  // const [htmltext, setHtmltext] = useState("");
  const navigation = useNavigate();

  const selectFile = (e) => {
    let file;
    if (e[0] !== undefined) {
      file = e[0];
    } else {
      file = e.target.files[0];
      // file = e.ta;
    }
    // setHtml(file);
    console.log(e[0]);
    if (file.type !== "text/plain" && file.type !== "text/html") {
      refFile.current.value = "";
      setFileUpload(false);
      return alert("Вы пытаетесь загрузить файл неподходящего формата!");
    }
    setFileUpload(true);
    setTimeout(() => {
      setClsDrop("hidden");
    }, 20);

    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result);
      refPreview.current.innerHTML = reader.result;
      setHtml(reader.result);
    };
    reader.readAsText(file);
  };

  const onChangeSizePreview = () => {
    if (clsPreview === "preview_email_container") {
      setClsPreview("full_screen_preview");
    } else {
      setClsPreview("preview_email_container");
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
    setClsDrop("grey_text_body drop_html_container active_dashed");
  };

  const drop = (e) => {
    e.preventDefault();
    refFile.current.files = e.dataTransfer.files;
    selectFile(e.dataTransfer.files);
    console.log(clsDrop);
    setClsDrop("grey_text_body drop_html_container");
  };

  const dragExit = (e) => {
    setClsDrop("grey_text_body drop_html_container");
  };

  const clickInput = () => {
    refFile.current.click();
  };

  const resetHTML = () => {
    setClsDrop("grey_text_body drop_html_container");
    setFileUpload(false);
    refFile.current.value = "";
    refPreview.current.innerHTML = "";
  };

  const saveTemplate = async () => {
    console.log(html);
    if (name.length < 3) {
      return alert("Слишком короткое название");
    }
    const res = await apiRequest.postHTMLTemplate({
      name: name,
      data: window.btoa(unescape(encodeURIComponent(html))),
    });
    if (res) {
      return navigation("/html");
    } else {
      alert("Не удалось сохранить");
    }
  };

  return (
    <PageComponent>
      <div className="container_email_service">
        <div className="selected_container">
          <div className="preview_title_container">
            <h1 className="title_page btn_action_title" onClick={resetHTML}>
              Новый шаблон
            </h1>
          </div>
          <div className="h100 left_func_container">
            {fileUpload ? (
              <div>
                <input
                  type="text"
                  className="name_inpt_email"
                  placeholder="Введите уникальное название"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="btn_container">
                  <Button_v1 name="Сбросить" onClick={resetHTML} />
                  <Button_v1 name="Сохранить" onClick={saveTemplate} />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div
              onDragLeave={dragExit}
              onDragOver={dragOver}
              onDrop={drop}
              className={clsDrop}
              ref={refDropArea}
              onClick={clickInput}
            >
              Перетащите файл, из допустимых форматов: html, txt
            </div>
            <input
              ref={refFile}
              type="file"
              accept=".txt, .html"
              className="hidden"
              onChange={selectFile}
            />
          </div>
        </div>
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
          <div className="preview_email" ref={refPreview}>
            {!fileUpload ? (
              <span className="grey_text_body">
                Загрузите файл сайта/письма, чтобы увидеть его в предпросмотре
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </PageComponent>
  );
};
