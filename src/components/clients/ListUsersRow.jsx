import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ItemUsersRow } from "./ItemUsersRow";
import { observer } from "mobx-react-lite";
import appState from "../../service/state/app.state";
import apiRequest from "../../service/api/api.request";
import stateClient from "../../service/state/state.client";
import { UsersCard } from "../../pages/UsersCard";

export const ListUsersRow = observer(({ clientCard, setClientCard }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      await apiRequest.getAllClient();
    };
    getClients();
  }, []);
  useEffect(() => {
    const data = appState.collection.data.find((d) => d.link === "users");
    console.log(data);
    return setUsers(data.data);
  }, [appState.collection]);

  const openClientCard = (c) => {
    console.log(c);
    stateClient.setParameters("client", c);
    setClientCard(true);
  };

  if (!clientCard) {
    if (users.length !== 0) {
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
          {users.map((c) => (
            <div
              key={c.cms_user_id}
              onClick={() => openClientCard(c)}
              // to={`/users/:${c.cms_user_id}`}
            >
              <ItemUsersRow c={c} />
            </div>
          ))}
        </ul>
      );
    } else {
      return <p>Список пуст</p>;
    }
  } else {
    return <UsersCard setClientCard={setClientCard} />;
  }
});
