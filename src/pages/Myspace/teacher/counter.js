import { CheckMarkIcon } from "assets/icons";
import React from "react";

const Counter = ({ information }) => {
  console.log(information)
  return (
    <div className="font-gibson mb-3">
      <div className="text-dark-500 font-semibold text-2xl">
        Tes compteurs à date
      </div>
      <div className="bg-white p-5 mt-5 rounded-lg">
        <div className="flex space-x-8 text-xl text-dark-500">
          <div className="text-center">
            <div>Formations données</div>
            <div className="text-primary font-semibold text-6xl my-5">{information?.givenCourses}</div>
          </div>

          <div className="text-center">
            <div>Formations à venir</div>
            <div className="text-secondary font-semibold text-6xl my-5">{information?.furtherCourses}</div>
          </div>

          <div>
            <div className="text-center">Tes formations avec le plus de succès</div>
            {information?.topCourses?.map((course) => (
            <div key={course.name} className="flex items-center">
              <CheckMarkIcon className="ml-2 mb-2" />
              <div>{course}</div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
