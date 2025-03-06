import React from "react";
import { Button_v1 } from "./Button_v1";

export const BtnBackHeaderPage = ({ children, ...props }) => {
  return (
    <div className="container_header_back_btn">
      <Button_v1 onClick={props.onClick} name="Назад" />
      {children}
    </div>
  );
};
