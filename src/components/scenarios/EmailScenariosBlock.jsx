import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import SelectedScenarios from "../../UI/components/scenarios/SelectedScenarios";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import stateScenarios from "../../service/state/state.scenarios";
export const EmailScenariosBlock = observer(
  ({ emailReques, setEmailReques }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [interval, setInterval] = useState(1);

    const onChangeTrigger = (e) => {
      if (e.target.value === "Единожды") {
        return setEmailReques({
          ...emailReques,
          trigger: "date",
          sent_every_: "run_date",
        });
      } else if (e.target.value === "Повторять по циклу") {
        return setEmailReques({
          ...emailReques,
          trigger: "interval",
          query_params: {},
        });
      } else if (e.target.value === "Повтор по времени") {
        // return setEmailReques({ ...emailReques, trigger: "cron" });
        return setEmailReques({
          ...emailReques,
          trigger: "date",
          sent_every_: "days",
          query_params: {},
        });
      } else if (e.target.value === "Динамическая рассылка") {
        return setEmailReques({
          ...emailReques,
          trigger: "interval",
          query_params: { updated_at: ["current_data", ">=", 1] },
        });
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
        setEmailReques({ ...emailReques, sent_every_: "days" });
      } else if (e.target.value === "Неделю") {
        setEmailReques({ ...emailReques, sent_every_: "weeks" });
      }
      // else if (e.target.value === "Месяц") {
      //   setEmailReques({ ...emailReques, sent_every_: "months" });
      // }
      // else if (e.target.value === "Год") {
      //   setEmailReques({ ...emailReques, sent_every_: "year" });
      // }
    };

    return (
      <>
        <SelectedScenarios
          data={[
            "Единожды",
            "Повторять по циклу",
            "Динамическая рассылка",
            // "Повтор по времени"
          ]}
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

        {emailReques.sent_every_ !== "run_date" ? (
          <>
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
                {JSON.stringify(emailReques.query_params) === "{}" ? (
                  <label>
                    Каждый(ую){" "}
                    <SelectedScenarios
                      data={[
                        "Час",
                        "День",
                        "Неделю",
                        // , "Месяц", "Год"
                      ]}
                      firstName="Период"
                      onChange={onChangeEvery}
                    />
                  </label>
                ) : (
                  <span>Проверять данные в указанное количество дней</span>
                )}

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
        ) : (
          <></>
        )}
      </>
    );
  }
);
