import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckMarkIcon,
  ComputerIcon,
  MentorIcon,
  MessengerIcon,
  SmileIcon,
  StarIcon,
} from "assets/icons";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import api from "services/api";
import BlueRectangle from "assets/images/rectangle_blue.png";

const TeacherOverview = () => {
  const history = useHistory();
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);

  const goBack = () => {
    history.goBack();
  };

  const fetchTeacher = async () => {
    await api.axios.get(`/v1/teacher/${id}`).then((res) => {
      setTeacher(res.teacher);
    });
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <div className="">
      <div className="p-5 flex items-center" onClick={goBack}>
        <ArrowLeftIcon />
        <p className="text-secondary-500 ml-2 cursor-pointer font-gibson font-semibold text-xl">
          Retour
        </p>
      </div>

      <div className="bg-white flex items-center justify-between w-full  px-10 py-5">
        <div className="flex items-center">
          <div className="ml-20 relative">
            <img
              alt="avatar"
              className="object-cover h-60 w-80 rounded-4xl"
              src={teacher?.picture}
            />
            <img
              className="absolute w-12 bottom-10 -left-5"
              src={BlueRectangle}
            />
          </div>

          <div className="ml-10">
            <h1 className="text-3xl text-dark-500 font-gibson font-semibold">
              {teacher?.firstName}
            </h1>
            <p className="text-3xl text-dark-500 font-gibson">
              {teacher?.sector === "market"
                ? "Marketing"
                : teacher?.sector === "design"
                ? "Designer"
                : "Developpeur"}
            </p>
            <p className="text-3xl text-dark-500 font-gibson">Paris</p>
            <div className="flex justify-between">
              <div className="py-2 px-5 mr-3 bg-dark-500 mt-2 rounded-full">
                <p className="text-white text-base font-medium font-gibson">
                  20€\h
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center bg-primary-500 rounded-4xl py-3 px-4">
            <CalendarIcon color="white" />
            <p className="text-white ml-2 font-gibson font-semibold text-sm">
              CALENDRIER
            </p>
          </div>

          <div className="flex items-center bg-secondary-500 rounded-4xl py-3 mt-5 px-4">
            <MessengerIcon color="white" />
            <p className="text-white ml-2 font-gibson font-semibold text-sm">
              CONTACTER
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-10">
        <div className="m-5 p-5 w-2/6 ">
          <h1 className="text-dark-500 text-2xl font-bold ml-2 mb-2">Profil</h1>
          <div className="bg-white p-5 shadow-lg rounded-4xl">
            <div className="flex">
              <CheckMarkIcon className="mr-2" />
              <p className="font-gibson text-xl mb-2 text-dark-500">
                Profil vérifié
              </p>
            </div>
            <div className="flex">
              <SmileIcon className="mr-2" />
              <p className="font-gibson text-xl mb-2 text-dark-500">
                Membre depuis 4 mois
              </p>
            </div>
            <div className="flex">
              <StarIcon className="mr-2" />
              <p className="font-gibson text-xl mb-2 text-dark-500">25 avis</p>
            </div>

            <div className="flex">
              <ComputerIcon className="mr-2" />
              <p className="font-gibson text-xl mb-2 text-dark-500">
                Formation en visio
              </p>
            </div>
            <div className="flex">
              <MentorIcon className="mr-2" />
              <p className="font-gibson text-xl text-dark-500">
                Formation indivudelle
              </p>
            </div>
          </div>
        </div>

        <div className="m-5 p-5 w-3/5 ">
          <h1 className="text-dark-500 text-2xl font-bold ml-2 mb-2">
            À propos
          </h1>
          <div className="bg-white p-7 shadow-lg rounded-4xl">
            <p>{teacher?.about}</p>
          </div>

          <h1 className="text-dark-500 mt-10 text-2xl font-bold ml-2 mb-2">
            Experience
          </h1>
          <div className="bg-white p-7 shadow-lg rounded-4xl">
            <p>{teacher?.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
