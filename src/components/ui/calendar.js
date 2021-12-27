import React, { useState, useEffect } from "react";
import Button from "components/ui/button";
import moment from "moment";
import "moment/locale/fr";
import api from "services/api";
import classNames from "classnames";

const daysOfTheWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const Calendar = ({ teacherId, action }) => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [daysInAMonth, setDaysInAMonth] = useState(0);
  const [days, setDays] = useState([]);
  const [firstDay, setFirstDay] = useState(null);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectScheldule, setSelectScheldule] = useState(null);

  const fetchCourses = async () => {
    const data = await api.axios.get(`/v1/scheldule/${teacherId}`);
    if (data?.courses) {
      data.courses
        .filter((course) => course.isActive)
        .filter((course) => course._schedules?.length);

      setCourses(data.courses);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const array = [];
    for (let index = 0; index < 5; index++) {
      const values = {
        month: moment().locale("fr").add(index, "month").format("MMMM"),
        year: moment().locale("fr").add(index, "month").format("YYYY"),
      };
      array.push(values);
    }
    setMonths(array);
    setSelectedMonth(array[0]);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const selected = moment()
        .month(selectedMonth.month)
        .year(selectedMonth.year)
        .format("YYYY-MM");
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
    const startOfTheMonth = moment()
      .month(selectedMonth?.month || Date.now())
      .year(selectedMonth?.year || Date.now())
      .startOf("month");
    const array = [];
    const toDay = moment().format("D");

    if (firstDay) {
      const indexFirstDay = daysOfTheWeek.findIndex(
        (day) => day === firstDay.charAt(0).toUpperCase() + firstDay.slice(1)
      );

      for (let currentIndex = 0; currentIndex < indexFirstDay; currentIndex++) {
        array.push(<div> </div>);
      }

      for (let pastDays = array.length; pastDays <= toDay; pastDays++) {
        array.push(
          <div className="italic m-2 font-gibson h-7 w-7 flex justify-center items-center">
            {pastDays}
          </div>
        );
      }

      for (let index = toDay; index <= daysInAMonth; index++) {
        const currentDay = moment(startOfTheMonth)
          .add(index - 1, "days")
          .format("DD/MM/YYYY");

        array.push(
          <div
            onClick={() => setSelectedDay(currentDay)}
            className={classNames(
              "m-2 font-gibson h-7 w-7 flex justify-center items-center",
              currentDay === moment().format("DD/MM/YYYY")
                ? "bg-primary-500 text-white rounded-full"
                : "",
              courses.find((course) =>
                course._schedules.find(
                  (schedule) =>
                    moment(schedule.day).format("DD/MM/YYYY") === currentDay
                )
              )
                ? "font-bold cursor-pointer"
                : "",
              courses.find((course) =>
                course._schedules.find(
                  (schedule) => schedule.repeat === "everyDay"
                )
              )
                ? "font-bold cursor-pointer"
                : "",
              selectedDay === currentDay ? "text-primary-500" : ""
            )}
          >
            {index}
          </div>
        );
      }
      setDays(array);
    }
  }, [daysInAMonth, firstDay, courses, selectedDay]);

  useEffect(() => {
    let event = []
    const res = []
    event = courses
      .map((course) =>
        course._schedules.filter(
          (schedule) =>
            moment(schedule.day).format("DD/MM/YYYY") === selectedDay
        )
      )
      .filter((element) => element.length > 0)[0]

    const everyDay = courses
      .map((course) =>
        course._schedules.filter((scheldule) => scheldule.repeat === "everyDay")
      )
      .filter((element) => element.length > 0)[0]
    
    event?.map((element) => {
      res.push(element)
    })
    everyDay?.map((element) => {
      console.log(element)
      res?.push(element)
    })

    setEvents(res);
  }, [selectedDay]);

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
            <div className="grid grid-cols-7 text-center">
              {daysOfTheWeek.map((day) => (
                <div
                  key={day}
                  className="font-gibson font-semibold text-2xl text-dark-500"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-4 text-center">
              {days.map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
            {events?.length > 0 && (
              <>
                <div className="font-semibold mt-5 font-gibson">
                  Disponibilités
                </div>
                <div className="mt-2 flex">
                  {events?.map((element) => (
                    <div
                      onClick={() => setSelectScheldule(element._id)}
                      className={classNames(
                        "p-2 rounded-full cursor-pointer font-gibson",
                        selectScheldule === element._id
                          ? "bg-primary-500 text-white"
                          : ""
                      )}
                    >
                      {moment(element.startAt).format("hh:mm")}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button text="RESERVER" type="primary" action={() => action(selectScheldule, selectedDay)} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
