import { observer } from "mobx-react-lite";
import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router";
import { ListRowHtmlTemplate } from "./ListRowHtmlTemplate";
import appState from "../../service/state/app.state";
import { CardHTML } from "./CardHTML";
import apiRequest from "../../service/api/api.request";
import { AddBtn } from "../../UI/components/AddBtn";

export const ListHtmlTemplate = observer(() => {
  useLayoutEffect(() => {
    apiRequest.getHTMLTemplateEmail();
  }, []);

  const [html, setHtml] = useState("");
  const [htmlFlagViewer, setHtmlFlagViewer] = useState(false);

  const removeHTML = async (e) => {
    console.log(e, "remove");
    apiRequest.removeHTMLTemplate(e);
  };
  const viewHTML = async (e) => {
    console.log(e, "view");
    setHtml(e);
    setHtmlFlagViewer(true);
  };

  if (htmlFlagViewer) {
    return <CardHTML html={html} setHtmlFlagViewer={setHtmlFlagViewer} />;
  }

  return (
    <div>
      <Link to={`/newhtml`}>
        <AddBtn />
      </Link>
      {appState.templatesHTMLEmail.length !== 0 ? (
        <ListRowHtmlTemplate removeHTML={removeHTML} viewHTML={viewHTML} />
      ) : (
        <p className="title_page">
          В базе данных нет ни одного шаблона. Создайте свой первый шаблон
        </p>
      )}
    </div>
  );
});
