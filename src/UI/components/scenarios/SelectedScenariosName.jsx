import { observer } from "mobx-react-lite";
import React from "react";

const SelectedScenariosName = observer(({ data, onChange, firstName, cls }) => {
  return (
    <select className={cls} onChange={onChange}>
      <option defaultValue hidden>
        {firstName}
      </option>
      {data.map((d) => (
        <option key={d} id={"'" + d.id + "'"}>
          {d.name}
        </option>
      ))}
    </select>
  );
});

export default SelectedScenariosName;
