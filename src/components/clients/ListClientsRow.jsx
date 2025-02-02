import React from "react";
import { ItemClientsRow } from "./ItemClientsRow";
import { Link } from "react-router";

export const ListClientsRow = () => {
  const fakeClientsData = [
    {
      mast_id: "fds5sgsdfsdgsdfgsg",
      phone: "79102547854",
      email: "heloh@mail.ru",
      name: "Петрович Петров Петровка",
      event: ["ya.ru", "Сидел палил ККТ Эвотор", "Добавил чековую ленту в корзину"],
    },
    {
      mast_id: "11111sgs45453dgsdfgsg",
      phone: "79107778877",
      email: "loh@mail.ru",
      name: "Петрович Петров ТотСамыйПарень",
      event: ["гугл.ком", "Сидел и не палил ККТ Эвотор", "Добавил ККТ эвотор"],
    },
    {
      mast_id: "2222sgsdfsdgsdfgsg",
      phone: "79102546666",
      email: "heloh@loh.ru",
      name: "Петрович Petrov Петровка",
      event: ["ya.ru", "Сидел палил ККТ Эвотор", "prosto petya"],
    },
  ];
  return (
    <ul className="list_container">
      <div className="tr_clients_row">
        <span className="name_tr_clients_row title_table">ФИО</span>
        <span className="phone-email_tr_clients_row title_table">Телефон</span>
        <span className="phone-email_tr_clients_row title_table">e-mail</span>
        <span className="id_tr_clients_row title_table">МАСТ ИД</span>
      </div>
      {fakeClientsData.map((c) => (
        <Link key={c.mast_id} to={`/clients/:${c.mast_id}`}>
          <ItemClientsRow c={c} />
        </Link>
      ))}
    </ul>
  );
};
