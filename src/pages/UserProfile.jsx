import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../service/api/api.request";
import { ValueInput } from "../UI/components/ValueInput";
import { Button_v1 } from "../UI/components/Button_v1";

export const UserProfile = () => {
  const [profile, setProfile] = useState(undefined);
  const [pass, setPass] = useState("");
  const [passRepit, setPassRepit] = useState("");
  const [passEdit, setPassEdit] = useState(false);
  const [myProfile, setMyProfile] = useState(true);
  const [mySetting, setMySetting] = useState(false);
  const [tabTemplateCls, setTabTemplateCls] = useState("tab_active");
  const [tabMailingCls, setTabMailingCls] = useState("tab_deactive");

  const selectedTabMyProfile = () => {
    setMyProfile(true);
    setMySetting(false);
    setTabTemplateCls("tab_active");
    setTabMailingCls("tab_deactive");
  };
  const selectedTabSetting = () => {
    setMyProfile(false);
    setMySetting(true);
    setTabTemplateCls("tab_deactive");
    setTabMailingCls("tab_active");
  };
  const refPass = useRef();

  const getProfile = async () => {
    const res = await apiRequest.getProfile();
    console.log(res);
    setProfile(res);
  };

  useEffect(() => {
    getProfile();
  }, []);
  if (profile !== undefined) {
    return (
      <div className="container_main_top">
        <div className="tabContainer">
          <span onClick={selectedTabMyProfile} className={tabTemplateCls}>
            Мои данные
          </span>
          <span onClick={selectedTabSetting} className={tabMailingCls}>
            Настройки
          </span>
        </div>
        {myProfile ? (
          <div className="container_50">
            <ValueInput
              nameRus="Фамилия"
              valueName={profile.last_name}
              name="last_name"
            />
            <ValueInput
              nameRus="Имя"
              valueName={profile.first_name}
              name="first_name"
            />
            <ValueInput
              nameRus="Телефон"
              valueName={profile.phone}
              name="phone"
            />
            <ValueInput
              nameRus="Email"
              valueName={profile.email}
              name="email"
            />
          </div>
        ) : (
          <></>
        )}
        {mySetting ? (
          <div className="container_50" ref={refPass}>
            {!passEdit ? (
              <span onClick={() => setPassEdit(true)} className="span_btn">
                Сменить пароль
              </span>
            ) : (
              <>
                <div className="container_value">
                  <span className="container_value_name">
                    Введите новый пароль:
                  </span>
                  <label className="input-wrapper">
                    <input
                      type="password"
                      placeholder="Введите пароль"
                      className="container_value-inpt"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <span className="container_value-inpt_span hidden">
                      {pass}
                    </span>
                  </label>
                </div>
                <div className="container_value">
                  <span className="container_value_name">
                    Введите новый пароль:
                  </span>
                  <label className="input-wrapper">
                    <input
                      type="password"
                      placeholder="Повторите пароль"
                      className="container_value-inpt"
                      value={passRepit}
                      onChange={(e) => setPassRepit(e.target.value)}
                    />
                    <span className="container_value-inpt_span hidden">
                      {passRepit}
                    </span>
                  </label>
                </div>
                <div className="btn_modal_container">
                  <Button_v1
                    className="container_value-btn"
                    onClick={() => setPassEdit(false)}
                    name="Отменить"
                  />
                  <Button_v1
                    className="container_value-btn"
                    onClick={() => apiRequest.changePass(pass)}
                    name="Применить"
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
};
