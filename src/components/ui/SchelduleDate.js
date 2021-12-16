import React, { useEffect } from "react";
import moment from "moment";
import { CrossIcon } from "assets/icons";
import { useState } from "react";
import api from "services/api";

const SchelduleDate = ({ scheldule, refreshAction }) => {
  const [render, setRendering] = useState();

  const deleteScheldule = async () => {
      await api.axios.delete("/v1/scheldule", {
        data: {
          schelduleId: scheldule._id
        }
      }).then(() => {
        refreshAction()
      })
  };

  useEffect(() => {
    switch (scheldule.repeat) {
      case "noRepeat":
        setRendering(
          <div className="bg-blueGray-200 rounded-md mr-2 px-5 py-2 flex items-center">
            <div className="font-gibson font-bold mr-2">
              {moment(scheldule.day).format("DD/MM")}
            </div>
            <div className="font-gibson">
              {moment(scheldule.startAt).format("hh:mm")}
            </div>
            <div className="mx-2">-</div>
            <div className="font-gibson">
              {moment(scheldule.endAt).format("hh:mm")}
            </div>
            <CrossIcon
              onClick={deleteScheldule}
              className="h-3 cursor-pointer w-3 ml-2 "
            />
          </div>
        );
        break;
      case "everyDay":
        setRendering(
          <div className="bg-blueGray-200 border-dashed border border-primary-400 rounded-md mr-2 px-5 py-2 flex items-center">
            <div className="font-gibson font-bold mr-2">
              Tous les jours entre
            </div>
            <div className="font-gibson">
              {moment(scheldule.startAt).format("hh:mm")}
            </div>
            <div className="mx-2">-</div>
            <div className="font-gibson">
              {moment(scheldule.endAt).format("hh:mm")}
            </div>
            <CrossIcon
              onClick={deleteScheldule}
              className="h-3 cursor-pointer w-3 ml-2 "
            />
          </div>
        );
        break;

      case "everyWeek":
        setRendering(
          <div className="bg-blueGray-200 border-dashed border border-primary-400 rounded-md mr-2 px-5 py-2 flex items-center">
            <div className="font-gibson font-bold mr-2">Tous les</div>
            <div className="font-gibson font-bold mr-2">
              {moment(scheldule.day).format("dddd")} de
            </div>
            <div className="font-gibson">
              {moment(scheldule.startAt).format("hh:mm")}
            </div>
            <div className="mx-2">-</div>
            <div className="font-gibson">
              {moment(scheldule.endAt).format("hh:mm")}
            </div>
            <CrossIcon
              onClick={deleteScheldule}
              className="h-3 cursor-pointer w-3 ml-2 "
            />
          </div>
        );
        break;
      default:
        break;
    }
  }, [scheldule]);

  return (
    <div key={scheldule._id} className="mt-2">
      {render}
    </div>
  );
};

export default SchelduleDate;
