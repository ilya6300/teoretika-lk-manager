import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../service/api/api.request";
import { ValueInput } from "../UI/components/ValueInput";

export const UserProfile = () => {
  const [profile, setProfile] = useState(undefined);
  const [pass, setPass] = useState("");
  const [passRepit, setPassRepit] = useState("");
  const [passEdit, setPassEdit] = useState(false);
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
      <div className="container_main_flx_btwn">
        <div className="container_50">
          <div className="container_main_top">
            <ValueInput
              name="Фамилия"
              value={profile.last_name}
              apiFunc={() => console.log("value edit!")}
            />
            <ValueInput
              name="Имя"
              value={profile.first_name}
              apiFunc={() => console.log("value edit!")}
            />
            <ValueInput
              name="Телефон"
              value={profile.phone}
              apiFunc={() => console.log("value edit!")}
            />
            <ValueInput
              name="Email"
              value={profile.email}
              apiFunc={() => console.log("value edit!")}
            />
          </div>
        </div>
        <div
          className="container_pass_profile container_main_top"
          ref={refPass}
        >
          {!passEdit ? (
            <span onClick={() => setPassEdit(true)} className="span_btn">
              Сменить пароль
            </span>
          ) : (
            <>
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
                <span className="container_value-inpt_span hidden">{pass}</span>
              </label>
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
              <div className="btn_modal_container">
                <button
                  className="container_value-btn"
                  onClick={() => setPassEdit(false)}
                >
                  Отменить
                </button>
                <button
                  className="container_value-btn"
                  onClick={() => apiRequest.changePass(pass)}
                >
                  Применить
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
};
