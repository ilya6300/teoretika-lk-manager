import React, {  useState } from "react";
import { PageComponent } from "../components/PageComponent";
import stateClient from "../service/state/state.client";
import { BtnBackHeaderPage } from "../UI/components/BtnBackHeaderPage";
import { observer } from "mobx-react-lite";

export const UsersCard = observer(({ setClientCard }) => {
  const [flagHistory, setFlagHistory] = useState(true);
  const [flagLead, setFlagLead] = useState(false);
  const [flagTreads, setFlagTreads] = useState(false);

  const [tabHistoryCls, setTabHistoryCls] = useState("tab_active");
  const [tabLeadCls, setTabLeadCls] = useState("tab_deactive");
  const [tabTreadsCls, setTabTreadsCls] = useState("tab_deactive");

  const selectedTabHistory = () => {
    setFlagHistory(true);
    setFlagLead(false);
    setFlagTreads(false);
    setTabHistoryCls("tab_active");
    setTabLeadCls("tab_deactive");
    setTabTreadsCls("tab_deactive");
  };
  const selectedTabLead = () => {
    setFlagHistory(false);
    setFlagLead(true);
    setFlagTreads(false);
    setTabHistoryCls("tab_deactive");
    setTabLeadCls("tab_active");
    setTabTreadsCls("tab_deactive");
  };
  const selectedTabTreads = () => {
    setFlagHistory(false);
    setFlagLead(false);
    setFlagTreads(true);
    setTabHistoryCls("tab_deactive");
    setTabLeadCls("tab_deactive");
    setTabTreadsCls("tab_active");
  };

  const HandlerString = (props) => {
    try {
      return (
        <ul className="mb25">
          {props.data
            .split("\n")
            .map((e) =>
              e !== "[" && e !== "]" ? (
                <li className="card_info_row">{e.replace(/["',\[\]]/g, "")}</li>
              ) : (
                ""
              )
            )}
        </ul>
      );
    } catch (e) {
      console.error(e, props);
    }
  };


  return (
    <PageComponent title="Карточка клиента">
      <BtnBackHeaderPage
        onClick={() => setClientCard(false)}
      ></BtnBackHeaderPage>
      <div className="card_info_container">
        <ul className="card_info_container_column">
          <li className="card_info_row_name mb25">
            {stateClient.client.first_name} {stateClient.client.last_name}{" "}
            {stateClient.client.second_name}{" "}
          </li>
          <HandlerString data={stateClient.client.email} />
          <HandlerString data={stateClient.client.phone_number} />
        </ul>
        <div className="w50 border_container_v1">
          {/* <HandlerString data={stateClient.client.devices} /> */}
          <p>id устройства: {stateClient.client.mast_id}</p>
        </div>
      </div>
      <ul className="border_container_v1 w100 ">
        <li className="card_info_row">
          ID (cms_user_id): {stateClient.client.cms_user_id}
        </li>
        <li className="card_info_row">
          Точка входа: {stateClient.client.url_point}{" "}
          <p>В разработке... Нет данных с Data Collectora...</p>
        </li>
      </ul>
      <div className="card_statistic_container w100">
        <div className="card_statistic_container_header ">
          {" "}
          <div className="tabContainer ">
            <span onClick={selectedTabHistory} className={tabHistoryCls}>
              История посещений
            </span>
            <span onClick={selectedTabLead} className={tabLeadCls}>
              Лиды
            </span>
            <span onClick={selectedTabTreads} className={tabTreadsCls}>
              Сделки
            </span>
          </div>
        </div>
        <div className="card_statistic_container_body">
          {flagHistory ? (
            <p>В разработке... Нет данных с Data Collectora...</p>
          ) : (
            // <HandlerString data={stateClient.client.history} />
            <></>
          )}
          {flagLead ? (
            <p>В разработке... Нет данных с Data Collectora...</p>
          ) : (
            //  <HandlerString data={stateClient.client.leads} />
            <></>
          )}
          {flagTreads ? (
            // <HandlerString data={stateClient.client.traeds} />
            <p>В разработке... Нет данных с Data Collectora...</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </PageComponent>
  );
});
