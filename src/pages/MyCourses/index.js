import React, { useState } from "react";
import { useEffect } from "react";
import api from "services/api";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Button from "components/ui/button";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import TimePicker from "react-time-picker";
import "./index.css";
const MyCourses = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await api.axios.get("/v1/auth/me");
    if (data.user) {
      setUser(data.user);
    }
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div className="lg:grid grid-cols-7 gap-4 ">
      <div className="col-span-5 my-7 mx-16">
        <div className="flex items-center justify-between">
          <div className="font-gibson font-semibold text-2xl text-dark-500">
            Les cours que tu proposes
          </div>
          <Button text="AJOUTER" type="primary" />
        </div>

        <div className="bg-white mt-8 rounded-3xl shadow-lg">
          {user?.courses?.map((course, index) => (
            <div
              className={`w-full py-5 ${
                user?.courses.length - 1 === index
                  ? ""
                  : "border-b border-dark-100"
              }`}
              key={course._id}
            >
              <div className="w-full p-2 mx-auto bg-white rounded-2xl">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-2xl font-gibson font-semibold text-left text-dark-500 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>{course.title}</span>
                        <div></div>
                        <div
                          className={`ml-auto mr-60 text-base font-normal px-3 py-1 rounded-full ${
                            course.isActive
                              ? "bg-secondary-300 text-secondary"
                              : "bg-gray-300 text-gray-500"
                          }`}
                        >
                          {course.isActive ? "En ligne" : "Hors ligne"}
                        </div>
                        <ChevronUpIcon
                          className={`${
                            open ? "" : "transform rotate-180"
                          } w-10 h-10 transform duration-300 text-dark-100`}
                        />
                      </Disclosure.Button>

                      <Disclosure.Panel className="px-4 pt-4 pb-2">
                        <div>
                          <div className="text-dark-500 font-gibson font-semibold">
                            Tes horaires
                          </div>
                          {course.schedule ? (
                            <div></div>
                          ) : (
                            <div className=" italic text-dark-500">
                              Pas de d'horaire enregistré
                            </div>
                          )}

                          <div>
                            <div className="mt-10">
                              <div>
                                <p className="text-dark-500 font-gibson font-semibold mb-2">
                                  Créer une nouvelle date
                                </p>
                                <div className="flex items-start">
                                  <DayPickerInput
                                    inputProps={{
                                      className: "px-2 py-3 shadow rounded mr-10",
                                    }}
                                    classNames="border"
                                    placeholder="Choisir un jour"
                                    onDayChange={(day) => console.log(day)}
                                    format="MM-dd-yyyy"
                                    dayPickerProps={{
                                      locale: "fr",
                                    }}
                                  />
                                  <TimePicker
                                    className="px-2 py-3 shadow rounded"
                                    locale="fr"
                                    disableClock={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <Button
                                type="primary"
                                text="AJOUTER UN HORRAIRE"
                              />
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white hidden lg:block h-screen col-span-2 shadow-lg"></div>
    </div>
  );
};

export default MyCourses;
