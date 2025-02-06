import React, { useRef, useState } from "react";
import { PageComponent } from "../components/PageComponent";
import iconFullScreen from "../images/icons/full-screen-icon.png";

const EmailPage = () => {
  const [clsPreview, setClsPreview] = useState("preview_email_container");
  const refPreview = useRef(null);
  const refFile = useRef(null);
  const [fileUpload, setFileUpload] = useState(false);
  const selectFile = (e) => {
    console.log(e.target.files);
    if (
      e.target.files[0].type !== "text/plain" &&
      e.target.files[0].type !== "text/html"
    ) {
      refFile.current.value = "";
      setFileUpload(false);
      return alert("Вы пытаетесь загрузить файл неподходящего формата!");
    }
    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result);
      refPreview.current.innerHTML = reader.result;
    };
    setFileUpload(true);
    reader.readAsText(e.target.files[0]);
  };

  const onChangeSizePreview = () => {
    if (clsPreview === "preview_email_container") {
      setClsPreview("full_screen_preview");
    } else {
      setClsPreview("preview_email_container");
    }
  };

  return (
    <PageComponent>
      <div className="container_email_service">
        <div className="selected_container">
          <div className="preview_title_container">
            <h1 className="title_page">Выбор шаблона </h1>
          </div>
          <span className="grey_text_body">
            Выберите файл, из допустимых форматов: html, txt
          </span>
          <input
            ref={refFile}
            type="file"
            accept=".txt, .html"
            className="inpt_email"
            onChange={selectFile}
          />
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

export default EmailPage;
