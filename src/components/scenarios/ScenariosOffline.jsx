import React, { useState } from "react";
import { AddBtn } from "../../UI/components/AddBtn";

const ScenariosOffline = ({ setNewScenariosOffline }) => {
  return (
    <div className="scenarios_container">
      <AddBtn onClick={() => setNewScenariosOffline(true)} />
    </div>
  );
};

export default ScenariosOffline;
