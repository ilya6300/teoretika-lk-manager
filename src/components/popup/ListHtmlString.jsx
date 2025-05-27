import { observer } from "mobx-react-lite";
import React, { useLayoutEffect, useState } from "react";
import appState from "../../service/state/app.state";
import apiRequest from "../../service/api/api.request";
import { ListRowPopup } from "./ListRowPopup";
import { CardString } from "./CardString";
import { AddBtn } from "../../UI/components/AddBtn";

export const ListHtmlString = observer(({ data }) => {
  const [html, setHtml] = useState("");
  const [htmlFlagViewer, setHtmlFlagViewer] = useState(false);

  const viewHTML = async (e) => {
    setHtml(e);
    setHtmlFlagViewer(true);
  };

  if (htmlFlagViewer) {
    return <CardString html={html} setHtmlFlagViewer={setHtmlFlagViewer} />;
  } else {
    return (
      <div className="">
        <AddBtn
          help="Добавить новую строку над чат-ботом"
          onClick={() => viewHTML("new")}
        />
        {/* {appState.templatesHTMLPopup.length !== 0 ? ( */}
        <ListRowPopup viewHTML={viewHTML} data={data} />
        {/* ) : (
          <p className="title_page">
            В текущем релизе, вы не можете иметь более одного попапа, скрипта и
            дополнительной строки. Если вы видете данное сообщение, пожалуйста,
            обратитесь в отдел разработки.
          </p>
        )} */}
      </div>
    );
  }
});
