import React from "react";

const ScenariosInpt = (props) => {
  return (
    <input
      className="inpt_v1"
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default ScenariosInpt;
