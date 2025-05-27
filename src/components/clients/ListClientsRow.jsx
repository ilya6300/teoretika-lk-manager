import React, { useEffect, useState } from "react";
import { ItemClientsRow } from "./ItemClientsRow";
import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import appState from "../../service/state/app.state";
import apiRequest from "../../service/api/api.request";
import stateClient from "../../service/state/state.client";
import { ClientCard } from "../../pages/ClientCard";

export const ListClientsRow = observer(({ clientCard, setClientCard }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const res = await apiRequest.getAllClient();
      return res;
    };
    getClients();
  }, []);
  useEffect(() => {
    const data = appState.collection.data.find((d) => d.link === "clients");
    return setClients(data.data);
  }, [appState.collection]);

  const openClientCard = (c) => {
    stateClient.setParameters("client", c);
    setClientCard(true);
  };

  if (!clientCard) {
    if (clients.length !== 0) {
      return (
        <ul className="list_container">
          <div className="tr_clients_row tr_clients_row_list_header">
            <span className="name_tr_clients_row title_table">ФИО</span>
            <span className="phone-email_tr_clients_row title_table">
              Телефон
            </span>
            <span className="phone-email_tr_clients_row title_table">
              e-mail
            </span>
            {/* <span className="id_tr_clients_row title_table">МАСТ ИД</span> */}
          </div>
          {clients.map((c) => (
            <div
              key={c.cms_user_id}
              onClick={() => openClientCard(c)}
              // to={`/clients/:${c.cms_user_id}`}
            >
              <ItemClientsRow c={c} />
            </div>
          ))}
        </ul>
      );
    } else {
      return <p>Список пуст</p>;
    }
  } else {
    return <ClientCard setClientCard={setClientCard} />;
  }
});
