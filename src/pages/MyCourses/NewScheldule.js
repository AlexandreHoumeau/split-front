import { RadioGroup } from "@headlessui/react";
import { DatePicker, Space, TimePicker } from "antd";
import React, { useState } from "react";
import classNames from "classnames";
import Button from "components/ui/button";
import api from "services/api";
import RenderDate from "./utils/renderDate";

const NewScheldule = ({ course, refreshAction }) => {
  const [disableDay, setDisableDay] = useState(false);
  const [date, setDate] = useState({
    day: "",
    startAt: null,
    endAt: null,
    repeat: "noRepeat",
  });

  const submitScheldule = async () => {
    try {
      const values = {
        ...date,
        courseId: course._id,
      };
      const data = await api.axios.post("/v1/scheldule/add", values);
      if (data?.$message) {
        setDate({
          day: "",
          startAt: null,
          endAt: null,
          repeat: "noRepeat",
        });
      } 
    } catch (error) {}
    finally {
      refreshAction()
    }

  };

  return (
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
                  onChange={(value) => setDate({ ...date, repeat: value })}
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
                              checked ? "text-indigo-900" : "text-gray-900",
                              "block text-sm font-gibson font-medium"
                            )}
                          >
                            Pas de récurrence
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={classNames(
                              checked ? "text-primary-700" : "text-gray-500",
                              "block text-sm font-gibson"
                            )}
                          >
                            Cet horaire est exceptionnel
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
                              checked ? "text-indigo-900" : "text-gray-900",
                              "block text-sm font-gibson font-medium"
                            )}
                          >
                            Tous les jours
                          </RadioGroup.Label>

                          {/* This Description is for the `RadioGroup.Option`.  */}
                          <RadioGroup.Description
                            as="span"
                            className={classNames(
                              checked ? "text-primary-700" : "text-gray-500",
                              "block text-sm font-gibson"
                            )}
                          >
                            Mettre cet horaire tous les jours
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
                          <RadioGroup.Label
                            as="span"
                            className={classNames(
                              checked ? "text-primary-900" : "text-gray-900",
                              "block text-sm font-gibson font-medium"
                            )}
                          >
                            Toutes les semaines
                          </RadioGroup.Label>

                          <RadioGroup.Description
                            as="span"
                            className={classNames(
                              checked ? "text-primary-700" : "text-gray-500",
                              "block text-sm font-gibson"
                            )}
                          >
                            Mettre cet horaire toutes les semaines
                          </RadioGroup.Description>
                        </div>
                      )}
                    </RadioGroup.Option>
                  </div>
                </RadioGroup>
              </div>
              <RenderDate date={date} setDisableDay={(value) => setDisableDay(value)} />
            </Space>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          action={() => submitScheldule()}
          type="primary"
          text="AJOUTER UN HORAIRE"
        />
      </div>
    </div>
  );
};

export default NewScheldule
