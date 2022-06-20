import { format } from "date-fns";
import React from "react";

const PastCourses = ({ courses }) => {
  return (
    <div className="font-gibson mb-3">
      <div className="text-dark-500 font-semibold text-2xl">
        Historique de tes formations
      </div>

      <div className="flex overflow-scroll w-full space-x-4 p-4">
        {courses?.map((course) => (
          <div className="bg-white max-w-md flex-shrink-0 p-4 rounded-3xl" key={course?._id}>
            <div className="font-semibold">
              {course?._course?.title} avec {course?._teacher.firstName}
            </div>
            <div>Le {format(new Date(course?._startAt), "dd MMMM yyyy")}</div>
            <div>Visio conférence</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastCourses;
