import { observer } from "mobx-react-lite";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SelectedScenarios from "../../UI/components/scenarios/SelectedScenarios";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import stateScenarios from "../../service/state/state.scenarios";
export const EmailScenariosBlock = observer(
  ({ emailReques, setEmailReques, _new }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [interval, setInterval] = useState(1);
    const [intervalName, setIntervalName] = useState("Период");
    const [sentEvery, setSentEvery] = useState("Период");

    // Если сценарий не новый, а редактируется текущий
    useLayoutEffect(() => {
      if (_new === null) return;
      console.log("------------_new", _new);
      const checkTrigger = _new.trigger.match(/^interval/);
      // Интервал
      if (checkTrigger) {
        const i = String(_new.trigger.match(/\d/));
        setInterval(Number(i));
        // Тип рассылки
        if (
          JSON.stringify(_new.query_params) === "{}" ||
          !_new.query_params ||
          _new.query_params === null ||
          _new.query_params === "null"
        ) {
          const element = {
            target: {
              value: "Повторять по циклу",
            },
          };
          setIntervalName("Повторять по циклу");
          onChangeTrigger(element);
        } else {
          const element = {
            target: {
              value: "Динамическая рассылка",
            },
          };
          setIntervalName("Динамическая рассылка");
          onChangeTrigger(element);
        }
        // Даты
        if (_new.start_date !== "None" && _new.start_date !== null) {
          const st = _new.start_date.replace(/\..*/, "");
          setStartDate(st);
        }
        if (_new.end_date !== "None" && _new.end_date !== null) {
          const st = _new.end_date.replace(/\..*/, "");
          setEndDate(st);
        }
        // sent_every weeks  hours
        if (_new.trigger.match(/days/)) {
          setEmailReques({ ...emailReques, sent_every_: "days" });
          setSentEvery("День");
        }
        if (_new.trigger.match(/weeks/)) {
          setEmailReques({ ...emailReques, sent_every_: "weeks" });
          setSentEvery("Неделю");
        }
        if (_new.trigger.match(/hours/)) {
          setEmailReques({ ...emailReques, sent_every_: "hours" });
          setSentEvery("Час");
        }
      } else {
        setIntervalName("Единожды");
        const element = {
          target: {
            value: "Единожды",
          },
        };
        onChangeTrigger(element);
        const st = _new.trigger.replace(/(date\[)/, "").replace(/( UTC\])/, "");
        setStartDate(st);
        console.log(st);
      }
    }, []);

    const onChangeTrigger = (e) => {
      console.log(emailReques.query_params);
      if (e.target.value === "Единожды") {
        return setEmailReques({
          ...emailReques,
          trigger: "date",
          sent_every_: "run_date",
        });
      }
      if (e.target.value === "Повторять по циклу") {
        return setEmailReques({
          ...emailReques,
          trigger: "interval",
          query_params: {},
        });
      }
      // if (e.target.value === "Повтор по времени") {
      //   // return setEmailReques({ ...emailReques, trigger: "cron" });
      //   return setEmailReques({
      //     ...emailReques,
      //     trigger: "date",
      //     sent_every_: "days",
      //     query_params: {},
      //   });
      // }
      if (e.target.value === "Динамическая рассылка") {
        return setEmailReques({
          ...emailReques,
          trigger: "interval",
          query_params: {
            updated_at: ["current_data", ">=", Number(emailReques.interval)],
          },
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
    console.log("emailReques", emailReques);
    return (
      <>
        <SelectedScenarios
          data={[
            "Единожды",
            "Повторять по циклу",
            "Динамическая рассылка",
            // "Повтор по времени"
          ]}
          firstName={intervalName}
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
                {JSON.stringify(emailReques.query_params) === "{}" ||
                emailReques.query_params === null ||
                emailReques.query_params === "null" ||
                !emailReques.query_params ? (
                  <label>
                    Каждый(ую){" "}
                    <SelectedScenarios
                      data={[
                        "Час",
                        "День",
                        "Неделю",
                        // , "Месяц", "Год"
                      ]}
                      firstName={sentEvery}
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
