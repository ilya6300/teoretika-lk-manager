import React, { useState } from "react";
import { PageComponent } from "../components/PageComponent";
import { values } from "mobx";

const EmailPage = () => {
  const [h1, setH1] = useState("");
  const [body, setBody] = useState("");
  const [previewBody, setPreviewBody] = useState([]);
  const [img1, setImg1] = useState("");
  const [imgWidth1, setImgWidth1] = useState("0px");
  const [imgheigth1, setImgheigth1] = useState("0px");

  const changeBody = (e) => {
    setBody(e.target.value);
    const bodyArray = e.target.value.split(`\n`);
    console.log(e.target.value, bodyArray);
    setPreviewBody(bodyArray);
  };

  return (
    <PageComponent>
      <div className="container_email_service">
        <div className="container_fields">
          <h1 className="title_page">Содержание письма</h1>
          <ul className="container_fields_ul">
            <li>
              <p className="row_field">Введите заголовок письма</p>
              <input
                className="inpt_email"
                type="text"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                placeholder="Формат аналогичен h1 в на сайте"
              />
            </li>
            <li>
              <p className="row_field">Содержимое письма</p>
              <textarea
                className="txtarea_email"
                value={body}
                onChange={changeBody}
                type="text"
                placeholder="Содержимое письма"
              />
            </li>
            <li className="img_options_email">
              <p>url изображения:</p>
              <input
                className="inpt_email"
                type="text"
                placeholder="https://здесьадрескартинки"
                onChange={(e) => setImg1(e.target.value)}
                value={img1}
              />
              <p>Ширину и высоту можно задавать в единицах: "%" и "px"</p>
              <div className="wh_img_container">
                <div className="w_img_email">
                  <p>Ширина:</p>
                  <input
                    className="wh_inpt"
                    value={imgWidth1}
                    onChange={(e) => setImgWidth1(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="h_img_email">
                  <p>Высота:</p>
                  <input
                    className="wh_inpt"
                    value={imgheigth1}
                    onChange={(e) => setImgheigth1(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="preview_email_container">
          <h1 className="title_page">Предпросмотр</h1>
          <div className="preview_email">
            <h1 className="title_email">{h1}</h1>
            {previewBody.length !== 0 ? (
              <ul>
                {previewBody.map((string) => (
                  <li key={string}>{string}</li>
                ))}
              </ul>
            ) : (
              <></>
            )}
            {img1.length > 5 ? (
              <img
                src={`${img1}`}
                alt="Ошибка отображения изображения. Убедитесь что вы верно ввели url"
                style={{
                  width: `${imgWidth1}`,
                  height: `${imgheigth1}`,
                }}
              />
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
