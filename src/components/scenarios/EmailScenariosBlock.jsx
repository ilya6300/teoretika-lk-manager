import { observer } from "mobx-react-lite";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SelectedScenarios from "../../UI/components/scenarios/SelectedScenarios";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import stateScenarios from "../../service/state/state.scenarios";
export const EmailScenariosBlock = observer(({ emailReques, setEmailReques, _new }) => {
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
      const element = {
        target: {
          value: "Повторять по циклу",
        },
      };
      setIntervalName("Повторять по циклу");
      onChangeTrigger(element);
      // Даты
      if (_new.start_date !== "None" && _new.start_date !== null) {
        const st = _new.start_date.match(/.{16}/, "");
        setStartDate(st);
      }
      if (_new.end_date !== "None" && _new.end_date !== null) {
        const st = _new.end_date.match(/.{16}/, "");
        setEndDate(st);
      }
      // sent_every weeks  hours
      if (_new.trigger.match(/(days)|(day)/)) {
        setEmailReques({ ...emailReques, sent_every_: "days" });
        setSentEvery("День");
      }
      if (_new.trigger.match(/(weeks)|(week)/)) {
        setEmailReques({ ...emailReques, sent_every_: "weeks" });
        setSentEvery("Неделю");
      }
      if (_new.trigger.match(/(hours)|(hour)/)) {
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
    }
  }, []);

  const onChangeTrigger = (e) => {
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
    // if (e.target.value === "Динамическая рассылка") {
    //   return setEmailReques({
    //     ...emailReques,
    //     trigger: "interval",
    //     query_params: {
    //       updated_at: ["current_data", ">=", Number(emailReques.interval)],
    //     },
    //   });
    // }
  };

  const setIntervalFucn = (e) => {
    setInterval(e.target.value);
    setEmailReques({ ...emailReques, interval: e.target.value });
  };

  const onChangeStartDate = (e) => {
    const value = e.target.value.replace(/T/g, " ").replace(/$/g, ":00");
    setStartDate(value);
    setEmailReques({ ...emailReques, start_date: value });
  };
  const onChangeEndDate = (e) => {
    const value = e.target.value.replace(/T/g, " ").replace(/$/g, ":00");
    setEndDate(value);
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
          // "Динамическая рассылка",
          // "Повтор по времени"
        ]}
        firstName={intervalName}
        onChange={onChangeTrigger}
      />
      <label>
        Начало выполнения сценария <ScenariosInpt value={startDate} onChange={onChangeStartDate} type="datetime-local" />
      </label>

      {emailReques.sent_every_ !== "run_date" ? (
        <>
          <label>
            Конец выполнения сценария <ScenariosInpt value={endDate} onChange={onChangeEndDate} type="datetime-local" />
          </label>
          {emailReques.trigger.includes("interval") ? (
            <>
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

              <label>
                Интервал <input type="number" className="inpt_v1" style={{ width: "70px" }} value={interval} onChange={setIntervalFucn} />
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
});
