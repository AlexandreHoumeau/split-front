import React, { useState, useEffect } from "react";
import Button from 'components/ui/button'
import moment from "moment";
import "moment/locale/fr";

const daysOfTheWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const Calendar = () => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [daysInAMonth, setDaysInAMonth] = useState(0);
  const [days, setDays] = useState([]);
  const [firstDay, setFirstDay] = useState(null);

  useEffect(() => {
    const array = [];
    for (let index = 0; index < 5; index++) {
      const values = {
        month: moment().locale("fr").add(index, "month").format("MMMM"),
        year: moment().locale("fr").add(index, "month").format("YYYY")
      }
      array.push(values)
    }
    setMonths(array);
    setSelectedMonth(array[0]);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const selected = moment().month(selectedMonth.month).year(selectedMonth.year).format("YYYY-MM");
      setFirstDay(
        moment(selected, "YYYY-MM")
          .startOf("month")
          .format("ddd")
          .split(".")
          .join("")
      );
      setDaysInAMonth(moment(selected, "YYYY-MM").daysInMonth());
    }
  }, [selectedMonth]);

  useEffect(() => {
    const array = [];
    if (firstDay) {
      const indexFirstDay = daysOfTheWeek.findIndex(
        (day) => day === firstDay.charAt(0).toUpperCase() + firstDay.slice(1)
      );
      for (let currentIndex = 0; currentIndex < indexFirstDay; currentIndex++) {
        array.push(<div> </div>);
      }
      for (let index = 1; index <= daysInAMonth; index++) {
        array.push(<div className="mt-5">{index}</div>);
      }
      setDays(array);
    }
  }, [daysInAMonth, firstDay]);

  return (
    <div className="mb-20 mt-10">

      {/* CALENDAR */}
      <div className="flex justify-center">
        {/* HEADER (months) */}
        <div className="lg:w-3/5 w-4/5">
          <div className="flex justify-center items-end">
            {months.map((el) => (
              <div
                onClick={() => setSelectedMonth(el)}
                className={`${
                  selectedMonth === el
                    ? "bg-secondary pb-6"
                    : "bg-secondary-400"
                } xl:mr-5 mr-2 transform duration-300 cursor-pointer px-8 py-2 rounded-t-xl`}
              >
                <div className="text-white font-gibson font-semibold">
                  {el.month.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          {/* BODY (days) */}
          <div className="w-full bg-white px-11 py-6 rounded-3xl ">
            {/* DAYS OF THE WEEK */}
            <div className="grid grid-cols-7 gap-4 text-center">
              {daysOfTheWeek.map((day) => (
                <div className="font-gibson font-semibold text-2xl text-dark-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-4 text-center">
              {days.map((day) => (
                <>{day}</>
              ))}
            </div>
            <div className="flex mt-10 justify-center">
            <Button text="RESERVER" type="primary"  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
