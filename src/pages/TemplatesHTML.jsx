import React, { useEffect, useState } from "react";
import { ListHtmlTemplate } from "../components/email/ListHtmlTemplate";
import { observer } from "mobx-react-lite";
import { ListHtmlPopup } from "../components/popup/ListHtmlPopup";
import appState from "../service/state/app.state";
import apiRequest from "../service/api/api.request";

export const TemplatesHTML = observer(() => {
  const [tabTemplate, setTabTemplate] = useState(true);
  const [tabMailing, setTabMailing] = useState(false);
  const [tabString, setTabString] = useState(false);
  const [tabTemplateCls, setTabTemplateCls] = useState("tab_active");
  const [tabMailingCls, setTabMailingCls] = useState("tab_deactive");
  const [tabStringCls, setTabStringCls] = useState("tab_deactive");

  const selectedTabTemplate = () => {
    setTabTemplate(true);
    setTabMailing(false);
    setTabString(false);
    setTabTemplateCls("tab_active");
    setTabMailingCls("tab_deactive");
    setTabStringCls("tab_deactive");
  };
  const selectedMailing = () => {
    setTabTemplate(false);
    setTabMailing(true);
    setTabString(false);
    setTabTemplateCls("tab_deactive");
    setTabMailingCls("tab_active");
    setTabStringCls("tab_deactive");
  };
  const selectedString = () => {
    setTabTemplate(false);
    setTabMailing(false);
    setTabString(true);
    setTabTemplateCls("tab_deactive");
    setTabMailingCls("tab_deactive");
    setTabStringCls("tab_active");
  };

  useEffect(() => {
    apiRequest.getHTMLTemplatePopup();
  }, [tabMailing]);
  useEffect(() => {
    apiRequest.getHTMLTemplatString();
    console.log(window.btoa(
        unescape(encodeURIComponent(`<div>Эй, ты, друг!</div>`))
      ))
  }, [tabString]);

  return (
    <div className="container_main_top">
      <div className="tabContainer">
        <span onClick={selectedTabTemplate} className={tabTemplateCls}>
          Email
        </span>
        <span onClick={selectedMailing} className={tabMailingCls}>
          Popup
        </span>
        <span onClick={selectedString} className={tabStringCls}>
          Строка чата
        </span>
      </div>
      {tabTemplate ? <ListHtmlTemplate /> : <></>}
      {tabMailing ? (
        <ListHtmlPopup data={appState.templatesHTMLPopup} />
      ) : (
        <></>
      )}
      {tabString ? (
        <ListHtmlPopup data={appState.templatesHTMLString} />
      ) : (
        <></>
      )}
    </div>
  );
});
