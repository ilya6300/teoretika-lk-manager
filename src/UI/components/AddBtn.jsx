import React, { useState } from "react";

export const AddBtn = (props) => {
  const [help, setHelp] = useState(false);
  return (
    <button
      className="add_btn"
      onMouseMove={() => setHelp(true)}
      onMouseOut={() => setHelp(false)}
      onClick={props.onClick}
    >
      {help && props.help ? (
        <p className="cls_hover_v1">{props.help}</p>
      ) : (
        <></>
      )}
    </button>
  );
};
