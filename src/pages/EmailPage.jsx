import React, { useState } from "react";
import { ListHtmlTemplate } from "../components/email/ListHtmlTemplate";

export const EmailPage = () => {
  const [tabTemplate, setTabTemplate] = useState(true);

  return (
    <div>
      <div className="tabContainer">
        <span className="tab_active">Шаблоны</span>
      </div>
      {tabTemplate ? <ListHtmlTemplate /> : <></>}
    </div>
  );
};
