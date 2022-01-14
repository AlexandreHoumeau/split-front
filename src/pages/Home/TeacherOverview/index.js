import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router";
import { Dialog, Transition } from "@headlessui/react";

import api from "services/api";
import BlueRectangle from "assets/images/rectangle_blue.png";
import Button from "components/ui/button";

import {
  ArrowLeftIcon,
  CheckMarkIcon,
  ComputerIcon,
  MentorIcon,
  SmileIcon,
  StarIcon,
} from "assets/icons";
import Calendar from "components/ui/calendar";
import moment from "moment";

const TeacherOverview = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const goBack = () => {
    history.goBack();
  };
  const [bookingInformations, setBookingInformations] = useState({})

  const fetchTeacher = async () => {
    await api.axios.get(`/v1/teacher/${id}`).then((res) => {
      setTeacher(res.teacher);
    });
  };

  const fetchCourse = async (schelduleId, day) => {
    const { scheldule, course} = await api.axios.get(`/v1/scheldule/get/${schelduleId}`)
    setBookingInformations({
      ...bookingInformations,
      day,
      scheldule,
      course
    })
  }

  const contactTeacher = async () => {
    const data = await api.axios.post('/v1/conversation', {
      userId: teacher._id
    })

    if (data.conversation) {
        history.push(`/app/messenger/${data.conversation._id}`)
    }
  }

  useEffect(() => {
    fetchTeacher();
  }, []);

  async function setBookingModal(schelduleId, day) {
    if (schelduleId) {
      fetchCourse(schelduleId, day)
      document.getElementById("root").style.filter = "blur(5px)";
      setShowBookingModal(true)
    } else {
      setShowBookingModal(false)
    }
  }

  function closeModal() {
    setIsOpen(false);
    document.getElementById("root").style.filter = "none";
  }

  function openModal() {
    setIsOpen(true);
    document.getElementById("root").style.filter = "blur(5px)";
  }

  return (
    <>
      <div className="">
        <div className="p-5 flex items-center" onClick={goBack}>
          <ArrowLeftIcon />
          <div className="text-secondary-500 ml-2 cursor-pointer font-gibson font-semibold text-xl">
            Retour
          </div>
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
                alt="rectange"
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
                  <div className="text-white text-base font-medium font-gibson">
                    20€/h
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Button
              text="CALENDRIER"
              action={openModal}
              type="primary"
              icon="CalendarIcon"
            />
            <Button text="CONTACTER" action={contactTeacher} type="secondary" icon="MessengerIcon" />
          </div>
        </div>
        
      {!showModal ? (
          <div className="flex mt-10">
          <div className="m-5 p-5 w-2/6 ">
            <h1 className="text-dark-500 text-2xl font-bold ml-2 mb-2">
              Profil
            </h1>
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
                <p className="font-gibson text-xl mb-2 text-dark-500">
                  25 avis
                </p>
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
      ): (
        <Calendar action={(schelduleId, day) => setBookingModal(schelduleId, day)} teacherId={teacher._id} />
      )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-10 px-24 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="font-gibson font-semibold text-4xl text-primary text-center"
                >
                  Avant d’accéder au calendrier…
                </Dialog.Title>
                <div className="mt-2">
                  <div className="text-dark-500 font-gibson font-semibold text-lg my-6">
                    Sélectionne le type de formation que tu souhaites suivre{" "}
                  </div>
                  <ul>
                    {teacher?.details.map((detail) => (
                      <div key={detail} className="">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-primary-500"
                          />
                          <span className="ml-2">{detail}</span>
                        </label>
                      </div>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button
                    text="CALENDRIER"
                    type="secondary"
                    icon="CalendarIcon"
                    action={() => {
                      closeModal()
                      setShowModal(true)
                    }}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={showBookingModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            document.getElementById("root").style.filter = "none";
            setShowBookingModal(false)
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-10 px-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="font-gibson font-semibold text-4xl text-primary text-center"
                >
                  Reservation
                </Dialog.Title>
                <div className="mt-2">
                  <div className="text-dark-500 font-gibson  text-lg my-6">
                    Date: <span className="font-semibold">{bookingInformations?.day}</span>
                  </div>
                  <div className="text-dark-500 font-gibson text-lg my-6">
                    Heure: <span className="font-semibold">{moment(bookingInformations?.course?.startAt).format('hh')}H{moment(bookingInformations.course?.startAt).format('mm')}</span>
                  </div>
                  <div className="text-dark-500 font-gibson text-lg my-6">
                    Formateur.rice: <span className="font-semibold">{bookingInformations?.course?._teacher?.firstName} {bookingInformations?.course?._teacher?.lastName}</span>
                  </div>

                  <div className="text-dark-500 font-gibson text-lg my-6">
                    Moyen de paiment: <span className="font-semibold">VISA</span>
                  </div>
                  <div className="text-dark-500 font-gibson font-semibold text-lg my-6">
                    5341 **** **** ****
                  </div>
                    <div className="flex border-primary-500 border-2 rounded-lg">
                      <div className="bg-primary-500 cursor-pointer px-11 py-3 text-white font-gibson font-semibold">
                        VALIDER
                      </div>
                      <div className="px-11 py-3 text-dark-500 cursor-pointer font-gibson font-semibold">
                        ANNULER
                      </div>
                    </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TeacherOverview;
