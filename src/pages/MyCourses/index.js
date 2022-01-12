import React, { useState, useEffect } from "react";
import api from "services/api";
import { Disclosure, Switch } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Button from "components/ui/button";

import "antd/lib/date-picker/style/css";
import "moment/locale/fr";
import SchelduleDate from "components/ui/SchelduleDate";
import NewScheldule from "./NewScheldule";

const MyCourses = () => {
  const [courses, setCourses] = useState(null);
  const [enabled, setEnabled] = useState(false);

  const getCourses = async () => {
    const { courses } = await api.axios.get("/v1/teacher/courses/list");
    if (courses?.length) {
      setCourses(courses);
    }
  };

  const setCourseActive = async (course) => {
    await api.axios.put(`/v1/teacher/courses/${course._id}`, {
      isActive: !course.isActive
    })
    .then(() => {
      getCourses()
    })
  }

  useEffect(() => {
    getCourses();
  }, []);

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
          {courses?.map((course, index) => (
            <div
              className={`w-full py-5 ${
                courses.length - 1 === index ? "" : "border-b border-dark-100"
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
                            <div className="pb-5">
                              <Switch.Group>
                                <div className="flex items-center">
                                  <Switch
                                    checked={course.isActive}
                                    onChange={() => setCourseActive(course)}
                                    className={`${
                                      course.isActive ? "bg-secondary" : "bg-gray-200"
                                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                  >
                                    <span
                                      className={`${
                                        course.isActive
                                          ? "translate-x-6"
                                          : "translate-x-1"
                                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                    />
                                  </Switch>
                                  <Switch.Label className="ml-4 cursor-pointer font-gibson font-semibold">
                                    Mettre {course.isActive ? 'hors ligne' : 'en ligne'} le cours
                                  </Switch.Label>
                                </div>
                              </Switch.Group>
                              </div>
                          <div className="text-dark-500 font-gibson font-semibold">
                            Tes horaires
                          </div>
                          {course._schedules?.length > 0 ? (
                            <div className="flex flex-wrap">
                              {course._schedules.map((scheldule) => (
                                <SchelduleDate
                                  refreshAction={getCourses}
                                  scheldule={scheldule}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className=" italic text-dark-500">
                              Pas d'horaire enregistré
                            </div>
                          )}
                          <NewScheldule
                            course={course}
                            refreshAction={getCourses}
                          />
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
