import { observer } from "mobx-react-lite";
import React, { useLayoutEffect, useState } from "react";
import appState from "../../service/state/app.state";
import apiRequest from "../../service/api/api.request";
import { ListRowPopup } from "./ListRowPopup";
import { CardPopup } from "./CardPopup";

export const ListHtmlPopup = observer(({data}) => {


  const [html, setHtml] = useState("");
  const [htmlFlagViewer, setHtmlFlagViewer] = useState(false);

  const viewHTML = async (e) => {
    console.log(e, "view");
    setHtml(e);
    setHtmlFlagViewer(true);
  };

  if (htmlFlagViewer) {
    return <CardPopup html={html} setHtmlFlagViewer={setHtmlFlagViewer} />;
  }

  return (
    <div>
      {appState.templatesHTMLPopup.length !== 0 ? (
        <ListRowPopup viewHTML={viewHTML} data={data} />
      ) : (
        <p className="title_page">
          В текущем релизе, вы не можете иметь более одного попапа, скрипта и
          дополнительной строки. Если вы видете данное сообщение, пожалуйста,
          обратитесь в отдел разработки.
        </p>
      )}
    </div>
  );
});
