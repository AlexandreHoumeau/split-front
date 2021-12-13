import React, { useState } from "react";
import { useEffect } from "react";
import api from "services/api";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Button from "components/ui/button";
import { RadioGroup } from "@headlessui/react";

import "antd/lib/date-picker/style/css";
import { DatePicker, TimePicker, Space } from "antd";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/fr";

const MyCourses = () => {
  const [user, setUser] = useState(null);
  const [disableDay, setDisableDay] = useState(false);
  const [recapSentence, setRecapSentence] = useState(
    <p className="italic">Pas d'horraire séléctioné</p>
  );
  const [date, setDate] = useState({
    day: "",
    startAt: null,
    endAt: null,
    repeat: "noRepeat",
  });

  const fetchUser = async () => {
    const data = await api.axios.get("/v1/auth/me");
    if (data.user) {
      setUser(data.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(date);
    if (date.repeat === "everyDay") {
      setDisableDay(true);
      if (date.startAt && date.endAt) {
        setRecapSentence(<p>Tous les jours entre 12h et 13h</p>);
      } else {
        setRecapSentence(<p className="italic">Pas d'horraire séléctioné</p>);
      }
    }
    if (date.repeat === "everyWeek") {
      setDisableDay(false);
      if (date.day && date.startAt && date.endAt) {
        setRecapSentence(<p>Tous les jeudi entre 12h et 13h</p>);
        setRecapSentence(
          <p className="font-gibson text-dark-500 text-base">
            Le{" "}
            <span className="font-semibold">
              {moment(date.day).locale("fr").format("dddd Do MMMM YYYY")}
            </span>{" "}
            de {moment(date.startAt).format("hh:mm")} à{" "}
            {moment(date.endAt).format("hh:mm")}
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
            de {moment(date.startAt).format("hh:mm")} à{" "}
            {moment(date.endAt).format("hh:mm")}
          </p>
        );
      } else {
        setRecapSentence(<p className="italic">Pas d'horraire séléctioné</p>);
      }
    }
  }, [date]);

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
                              Pas d'horaire enregistré
                            </div>
                          )}

                          <div>
                            <div className="my-10">
                              <div>
                                <p className="text-dark-500 font-gibson font-semibold mb-2">
                                  Créer une nouvelle date
                                </p>
                                <div className="flex items-start">
                                  <Space
                                    className="flex items-start"
                                    direction="horizontal"
                                    size="large"
                                  >
                                    <div className="flex flex-col">
                                      <DatePicker
                                        onChange={(res) =>
                                          setDate({
                                            ...date,
                                            day: res?.toISOString() || null,
                                          })
                                        }
                                        format="DD/MM/YYYY"
                                        disabled={disableDay}
                                        className="w-60 font-gibson"
                                        style={{
                                          borderRadius: "10px",
                                          cursor: "pointer",
                                          fontSize: "17px",
                                          marginBottom: "10px",
                                          padding: "16px",
                                        }}
                                        placeholder="Choisir un jour"
                                        size="large"
                                      />
                                      <TimePicker
                                        onChange={(res) =>
                                          setDate({
                                            ...date,
                                            startAt: res?.toISOString() || null,
                                          })
                                        }
                                        className="w-60 font-gibson"
                                        style={{
                                          borderRadius: "10px",
                                          cursor: "pointer",
                                          fontSize: "17px",
                                          marginBottom: "10px",
                                          padding: "16px",
                                        }}
                                        size="large"
                                        placeholder="Choisir une heure de début"
                                        format={"HH:mm"}
                                      />
                                      <TimePicker
                                        onChange={(res) =>
                                          setDate({
                                            ...date,
                                            endAt: res?.toISOString() || null,
                                          })
                                        }
                                        className="w-60 font-gibson"
                                        style={{
                                          borderRadius: "10px",
                                          cursor: "pointer",
                                          fontSize: "17px",
                                          margin: "0px",
                                          padding: "16px",
                                        }}
                                        size="large"
                                        placeholder="Choisir une heure de fin"
                                        format={"HH:mm"}
                                      />
                                    </div>
                                    <div>
                                      <RadioGroup
                                        value={date.repeat}
                                        onChange={(value) =>
                                          setDate({ ...date, repeat: value })
                                        }
                                        className="relative"
                                      >
                                        <RadioGroup.Label className="text-dark-500 absolute -top-7 font-gibson font-semibold mb-5">
                                          Récurence
                                        </RadioGroup.Label>

                                        <div className="">
                                          <RadioGroup.Option
                                            value="noRepeat"
                                            className={({ checked }) =>
                                              `${
                                                checked
                                                  ? "bg-primary-300 border-primary-300"
                                                  : "border-gray-200"
                                              } mb-2 relative border p-2 cursor-pointer rounded-lg flex`
                                            }
                                          >
                                            {({ checked }) => (
                                              <div className="flex flex-col">
                                                <RadioGroup.Label
                                                  as="span"
                                                  className={classNames(
                                                    checked
                                                      ? "text-indigo-900"
                                                      : "text-gray-900",
                                                    "block text-sm font-gibson font-medium"
                                                  )}
                                                >
                                                  Pas de récurrence
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                  as="span"
                                                  className={classNames(
                                                    checked
                                                      ? "text-primary-700"
                                                      : "text-gray-500",
                                                    "block text-sm font-gibson"
                                                  )}
                                                >
                                                  Cet horraire est exceptionnel
                                                </RadioGroup.Description>
                                              </div>
                                            )}
                                          </RadioGroup.Option>

                                          <RadioGroup.Option
                                            value="everyDay"
                                            className={({ checked }) =>
                                              `${
                                                checked
                                                  ? "bg-primary-300 border-primary-300"
                                                  : "border-gray-200"
                                              } mb-2 relative border p-2 cursor-pointer rounded-lg flex`
                                            }
                                          >
                                            {({ checked }) => (
                                              <div className="flex flex-col">
                                                {/* This Label is for the `RadioGroup.Option`.  */}
                                                <RadioGroup.Label
                                                  as="span"
                                                  className={classNames(
                                                    checked
                                                      ? "text-indigo-900"
                                                      : "text-gray-900",
                                                    "block text-sm font-gibson font-medium"
                                                  )}
                                                >
                                                  Tous les jours
                                                </RadioGroup.Label>

                                                {/* This Description is for the `RadioGroup.Option`.  */}
                                                <RadioGroup.Description
                                                  as="span"
                                                  className={classNames(
                                                    checked
                                                      ? "text-primary-700"
                                                      : "text-gray-500",
                                                    "block text-sm font-gibson"
                                                  )}
                                                >
                                                  Mettre cet horraire tous les
                                                  jours
                                                </RadioGroup.Description>
                                              </div>
                                            )}
                                          </RadioGroup.Option>

                                          <RadioGroup.Option
                                            value="everyWeek"
                                            className={({ checked }) =>
                                              `${
                                                checked
                                                  ? "bg-primary-300 border-primary-300"
                                                  : "border-gray-200"
                                              } relative border p-2 cursor-pointer rounded-lg flex`
                                            }
                                          >
                                            {({ checked }) => (
                                              <div className="flex flex-col">
                                                {/* This Label is for the `RadioGroup.Option`.  */}
                                                <RadioGroup.Label
                                                  as="span"
                                                  className={classNames(
                                                    checked
                                                      ? "text-primary-900"
                                                      : "text-gray-900",
                                                    "block text-sm font-gibson font-medium"
                                                  )}
                                                >
                                                  Toutes les semaines
                                                </RadioGroup.Label>

                                                {/* This Description is for the `RadioGroup.Option`.  */}
                                                <RadioGroup.Description
                                                  as="span"
                                                  className={classNames(
                                                    checked
                                                      ? "text-primary-700"
                                                      : "text-gray-500",
                                                    "block text-sm font-gibson"
                                                  )}
                                                >
                                                  Mettre cet horraire toutes les
                                                  semaines
                                                </RadioGroup.Description>
                                              </div>
                                            )}
                                          </RadioGroup.Option>
                                        </div>
                                      </RadioGroup>
                                    </div>
                                    <div className="relative">
                                      <div className="text-dark-500 absolute -top-7 font-gibson font-semibold mb-5">
                                        Recapitulatif
                                      </div>
                                      <div>{recapSentence}</div>
                                    </div>
                                  </Space>
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
