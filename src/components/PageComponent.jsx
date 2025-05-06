import React from "react";

export const PageComponent = ({ children, ...props }) => {
  return (
    <div className="main_container">
      {/* <div className="main_title">{props.title}</div> */}
      <div className="main_children">{children}</div>
    </div>
  );
};
