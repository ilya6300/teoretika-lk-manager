import React, { useState } from "react";
import { useNavigate } from "react-router";
import appState from "../service/state/app.state";
import apiRequest from "../service/api/api.request";

export const Auth = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errInptName, setErrInptName] = useState("");
  const [errInptPass, setErrInptPass] = useState("");
  const navigation = useNavigate();
  const logIn = async (e) => {
    e.preventDefault();
    setErrInptName("");
    setErrInptPass("");
    if (name === "" || password === "") {
      if (name === "") {
        setErrInptName("Поле логин не заполнено");
        const nameID = document.querySelector("#inpt_name_id");
        nameID.classList.add("error_inpt");
        setTimeout(() => {
          nameID.classList.remove("error_inpt");
        }, 4000);
      }
      if (password === "") {
        setErrInptPass("Поле пароль не заполнено");
        const passID = document.querySelector("#inpt_pass_id");
        passID.classList.add("error_inpt");
        setTimeout(() => {
          passID.classList.remove("error_inpt");
        }, 4000);
      }
      return;
    }
    console.log(name, password);
    const res = await apiRequest.login(name, password);
    console.log(res);
    if (res === undefined) return;
    if (res.data.success) {
      const t = res.data.data.access_token.replace(/..$/, "");
      const k = String(res.data.data.access_token.match(/..$/));
      const r = appState.r();
      localStorage.setItem("at", appState.e(t));
      localStorage.setItem("k", appState.e(k + r));
      appState.setParameters("isAuth", true);
      // setTimeout(() => {
      return navigation("/home");
      // }, 100);
    } else {
      setErrInptPass(res.data.message);
      appState.setParameters("isAuth", false);
    }
  };

  return (
    <div className="login_container">
      <h1 className="login_title">МАСТ ТЕОРИКА</h1>
      <form className="login_form_container">
        <p className="login_form_title">Авторизуйтесь</p>
        <div className="login_form_container-input">
          <p className="login_form-name">Введите логин/email:</p>
          <input
            id="inpt_name_id"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login_form-inpt"
            type="text"
            placeholder="Логин"
          />
          <p className="login_inpt_message_error">{errInptName}</p>
        </div>
        <div className="login_form_container-input">
          <p className="login_form-name">Введите пароль:</p>
          <input
            id="inpt_pass_id"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login_form-inpt"
            type="password"
            placeholder="Пароль"
          />
          <p className="login_inpt_message_error">{errInptPass}</p>
        </div>
        <div className="login_btn_container">
          <button onClick={logIn} className="login_btn" type="submit">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
