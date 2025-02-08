import React from "react";

export const Button_v1 = (props) => {
  return <button className="btn_v1" onClick={props.onClick}>{props.name}</button>;
};
