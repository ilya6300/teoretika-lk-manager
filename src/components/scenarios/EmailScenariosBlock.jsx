import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import SelectedScenarios from "../../UI/components/scenarios/SelectedScenarios";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
export const EmailScenariosBlock = observer(
  ({ emailReques, setEmailReques }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [interval, setInterval] = useState(1);

    const onChangeTrigger = (e) => {
      if (e.target.value === "Единожды") {
        return setEmailReques({ ...emailReques, trigger: "date" });
      } else if (e.target.value === "Повтор интервально") {
        return setEmailReques({ ...emailReques, trigger: "interval" });
      } else if (e.target.value === "Повтор по времени") {
        return setEmailReques({ ...emailReques, trigger: "cron" });
      }
    };

    const setIntervalFucn = (e) => {
      setInterval(e.target.value);
      setEmailReques({ ...emailReques, interval: e.target.value });
    };

    const onChangeStartDate = (e) => {
      const value = e.target.value.replace(/T/g, " ").replace(/$/g, ":00");
      setStartDate(value);
      console.log(value);
      setEmailReques({ ...emailReques, start_date: value });
    };
    const onChangeEndDate = (e) => {
      const value = e.target.value.replace(/T/g, " ").replace(/$/g, ":00");
      setEndDate(value);
      console.log(value);
      setEmailReques({ ...emailReques, end_date: value });
    };

    const onChangeEvery = (e) => {
      if (e.target.value === "Час") {
        setEmailReques({ ...emailReques, sent_every_: "hours" });
      } else if (e.target.value === "День") {
        setEmailReques({ ...emailReques, sent_every_: "day" });
      } else if (e.target.value === "Неделю") {
        setEmailReques({ ...emailReques, sent_every_: "week" });
      } else if (e.target.value === "Месяц") {
        setEmailReques({ ...emailReques, sent_every_: "month" });
      } else if (e.target.value === "Год") {
        setEmailReques({ ...emailReques, sent_every_: "year" });
      }
    };

    return (
      <>
        <SelectedScenarios
          data={["Единожды", "Повтор интервально", "Повтор по времени"]}
          firstName="Период"
          onChange={onChangeTrigger}
        />
        <label>
          Начало выполнения сценария{" "}
          <ScenariosInpt
            value={startDate}
            onChange={onChangeStartDate}
            type="datetime-local"
          />
        </label>
        <label>
          Конец выполнения сценария{" "}
          <ScenariosInpt
            value={endDate}
            onChange={onChangeEndDate}
            type="datetime-local"
          />
        </label>
        {emailReques.trigger === "interval" ? (
          <>
            <label>
              Каждый(ую){" "}
              <SelectedScenarios
                data={["Час", "День", "Неделю", "Месяц", "Год"]}
                firstName="Период"
                onChange={onChangeEvery}
              />
            </label>
            <label>
              Интервал{" "}
              <input
                type="number"
                className="inpt_v1"
                style={{ width: "70px" }}
                value={interval}
                onChange={setIntervalFucn}
              />
            </label>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
);
