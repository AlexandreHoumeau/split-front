import Card from "components/ui/card";
import React, { useEffect, useState } from "react";
import api from "services/api";
import RectangleOrange from "assets/images/rectangle_orange.png";
// import RectangleBlue from 'assets/images/rectangle_blue.png'

const Home = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    await api.axios.get("/v1/teacher/list").then((res) => {
      if (res) {
        setTeachers(res.teachers);
      }
    });
  };

  return (
    <div className="mt-5 relative">

      {teachers.marketing?.length > 0 && (
        <div className="relative">
          <div className="flex justify-between">
            <p className="font-gibson text-2xl font-semibold text-dark-500 mb-5">
              Formations de marketing digital
            </p>
            <p className="text-primary-500 text-lg font-semibold cursor-pointer font-gibson ">
              Voir tout
            </p>
          </div>
          <div className="flex justify-between bg-white p-3 rounded-4xl">
            {teachers.marketing?.map((teacher, i) => (
              <Card key={i} teacher={teacher} />
            ))}
          </div>
        </div>
      )}

      {teachers.designer?.length > 0 && (
        <div className="mt-10">
          <div className="flex justify-between">
            <p className="font-gibson text-2xl font-semibold text-dark-500 mb-5">
              Formations de Web Design
            </p>
            <p className="text-primary-500 text-lg font-semibold cursor-pointer font-gibson ">
              Voir tout
            </p>
          </div>
          <div className="flex justify-between bg-white p-3 rounded-4xl">
            {teachers.designer?.map((teacher, i) => (
              <Card key={i} teacher={teacher} />
            ))}
          </div>
        </div>
      )}

      {teachers.developper?.length > 0 && (
        <div className="mt-10">
          <div className="flex justify-between">
            <p className="font-gibson text-2xl font-semibold text-dark-500 mb-5">
              Formations de developper
            </p>
            <p className="text-primary-500 text-lg font-semibold cursor-pointer font-gibson ">
              Voir tout
            </p>
          </div>

          <div className="flex justify-between bg-white p-3 rounded-4xl">
            {teachers.developper?.map((teacher, i) => (
              <Card key={i} teacher={teacher} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
