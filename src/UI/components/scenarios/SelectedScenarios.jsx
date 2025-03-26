import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

const SelectedScenarios = observer(
  ({ data, onChange, firstName, value, refValue }) => {
    useEffect(() => {
      console.log("SelectedScenarios", data);
    }, []);
    return (
      <select className="inpt_v1" onChange={onChange}>
        <option ref={refValue} defaultValue hidden>
          {firstName}
        </option>
        {data.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
    );
  }
);

export default SelectedScenarios;
