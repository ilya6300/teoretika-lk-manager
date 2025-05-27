import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../../service/api/api.request";

export const ValueInput = ({ valueName, name, nameRus }) => {
  const [editValue, setEditValue] = useState(false);
  const [value, setValue] = useState(valueName);

  let defaultValue;

  const refValue = useRef();
  const closedBlockTextPosition = (e) => {
    if (refValue.current && !refValue.current.contains(e.target)) {
      setValue(defaultValue);
      setEditValue(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closedBlockTextPosition);
  }, []);

  const openEdit = () => {
    defaultValue = value;
    setEditValue(true);
  };

  const apiFunc = () => {
    apiRequest.patchDateProfile({ [`${name}`]: value });
    setEditValue(false);
  };

  if (!editValue) {
    return (
      <div className="container_value">
        <span className="container_value_name">{nameRus}:</span>
        <span className="container_value-text" onClick={openEdit}>
          {value}
        </span>
      </div>
    );
  }
  if (editValue) {
    return (
      <div className="container_value" ref={refValue}>
        <span className="container_value_name">{nameRus}:</span>
        <div className="container_input">
          {/* <label className="input-wrapper"> */}
          <input type="text" className="container_value-inpt" value={value} onChange={(e) => setValue(e.target.value)} />
          <span className="container_value-inpt_span hidden">{value}</span>
          {/* </label> */}
          <button className="container_value-btn" onClick={apiFunc}>
            ok!
          </button>
        </div>
      </div>
    );
  }
  //   return (
  //     <div className="container_value">
  //       {!editValue ? (
  //         <span
  //           className="container_value-text"
  //           onClick={() => setEditValue(true)}
  //         >
  //           {value}
  //         </span>
  //       ) : (
  //         <label className="input-wrapper" ref={refValue}>
  //           <input
  //             type="text"
  //             className="container_value-inpt"
  //             value={value}
  //             onChange={(e) => setValue(e.target.value)}
  //           />
  //           <button className="container_value-btn" onClick={props.apiFunc}>
  //             ok!
  //           </button>
  //         </label>
  //       )}
  //     </div>
  //   );
};
