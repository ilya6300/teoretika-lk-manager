import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

const SelectedScenarios = observer(({ data, onChange, firstName }) => {
  useEffect(() => {
    console.log("Selected", data);
  }, []);
  return (
    <select className="inpt_v1" onChange={onChange}>
      <option defaultValue hidden>
        {firstName}
      </option>
      {data.map((d) => (
        <option key={d}>{d}</option>
      ))}
    </select>
  );
});

export default SelectedScenarios;
