import React from "react";
import ScenariosInpt from "../UI/components/scenarios/ScenariosInpt";

export const SettingsEvent = ({ url, onChangeUrl, timeout, onChangeTimeout, date, onChangeDate, click, onChangeClick }) => {
  return (
    <div className="settings_event_container">
      Дополнительные условия (необезательное)
      <div className="settings_event_row">
        <p className="settings_event_row_name">Посетил страницу:</p>
        <ScenariosInpt
          className="settings_event_row_value"
          value={url}
          onChange={onChangeUrl}
          placeholder="Пример: markirovka"
          type="text"
          style={{ minWidth: "285px" }}
        />
      </div>
      <div className="settings_event_row">
        <p className="settings_event_row_name">Клик по объекту:</p>
        <ScenariosInpt
          className="settings_event_row_value"
          value={click}
          onChange={onChangeClick}
          placeholder="Пример: #super_btn"
          type="text"
          style={{ minWidth: "285px" }}
        />
      </div>
      <div className="settings_event_row">
        <p className="settings_event_row_name">Задержка отображения (в cекундах):</p>
        <ScenariosInpt
          className="settings_event_row_value"
          value={timeout}
          onChange={onChangeTimeout}
          placeholder="Пример: 10"
          type="number"
          style={{ minWidth: "285px" }}
        />
      </div>
      <div className="settings_event_row">
        <p className="settings_event_row_name">Дата события:</p>
        <ScenariosInpt
          className="settings_event_row_value"
          value={date}
          onChange={onChangeDate}
          placeholder="Дата события"
          type="date"
          style={{ minWidth: "285px" }}
        />
      </div>
    </div>
  );
};
