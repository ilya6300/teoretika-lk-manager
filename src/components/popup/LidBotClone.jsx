import React from "react";

export const LidBotClone = ({ string }) => {
  return (
    <div className="lid-bot-container-hidden">
      <div className="lid-bot-icon-container">
        <div className="lid-bot-icon"></div>
        <div className="lid-bot-icon-puls"></div>
      </div>

      <div className="lid-bot-info" id="lid-bot-info">
        Работаем по всей России! Обращайтесь!
        {string.length !== 0 ? (
          <div className="drweb_tool-panel lid-bot-message api_string">
            {string}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
