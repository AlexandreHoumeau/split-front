import React, { useEffect, useState } from "react";
import moment from "moment";

const RenderDate = ({ date, setDisableDay }) => {
  const [recapSentence, setRecapSentence] = useState(
    <p className="italic">Pas d'horraire séléctioné</p>
  );
  useEffect(() => {
    if (date.repeat === "everyDay") {
      setDisableDay(true);
      if (date.startAt && date.endAt) {
        setRecapSentence(
          <p className="font-gibson text-dark-500 text-base">
            Tous les <span className="font-semibold">jours </span>
            entre {moment(date.startAt).locale("fr").format("HH:mm")} et{" "}
            {moment(date.endAt).locale("fr").format("HH:mm")}.
          </p>
        );
      } else {
        setRecapSentence(<p className="italic">Pas d'horraire séléctioné</p>);
      }
    }
    if (date.repeat === "everyWeek") {
      setDisableDay(false);
      if (date.day && date.startAt && date.endAt) {
        setRecapSentence(
          <p className="font-gibson text-dark-500 text-base">
            Tous les{" "}
            <span className="font-semibold">
              {moment(date.day).locale("fr").format("dddd")}
            </span>{" "}
            entre {moment(date.startAt).locale("fr").format("HH:mm")} et{" "}
            {moment(date.endAt).locale("fr").format("HH:mm")}.
          </p>
        );
      } else {
        setRecapSentence(<p className="italic">Pas d'horraire séléctioné</p>);
      }
    }
    if (date.repeat === "noRepeat") {
      setDisableDay(false);
      if (date.day && date.startAt && date.endAt) {
        setRecapSentence(
          <p className="font-gibson text-dark-500 text-base">
            Le{" "}
            <span className="font-semibold">
              {moment(date.day).locale("fr").format("dddd Do MMMM YYYY")}
            </span>{" "}
            de {moment(date.startAt).format("HH:mm")} à{" "}
            {moment(date.endAt).format("HH:mm")}.
          </p>
        );
      } else {
        setRecapSentence(<p className="italic">Pas d'horraire séléctioné</p>);
      }
    }
  }, [date]);

  return (
    <div className="relative">
      <div className="text-dark-500 absolute -top-7 font-gibson font-semibold mb-5">
        Recapitulatif
      </div>
      <div>{recapSentence}</div>
    </div>
  );
};

export default RenderDate;
