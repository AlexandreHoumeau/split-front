import React from "react";

const Card = ({ teacher, action }) => {
  return (
    <div onClick={() => action(teacher._id)} className="cursor-pointer bg-gray-50 mx-3 rounded-4xl flex flex-col justify-around items-center overflow-hidden sm:w-80 sm:flex-row sm:h-40">
      <div className="h-full w-5/12">
        <img
          className=" object-cover h-48 w-full"
          src={`${teacher?.picture}`}
          alt="profile_picture"
        />
      </div>
      <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/3 pl-6 sm:h-full sm:items-baseline sm:w-7/12">
        <div className="flex flex-col justify-start items-baseline">
          <h1 className="text-lg font-semibold mb-0 text-dark-500 font-gibson">
            {teacher.firstName}
          </h1>
          <span className="text-md font-gibson text-dark-500 font-normal mt-0">
            {teacher.bio}
          </span>
          <span className="text-md font-gibson text-dark-500 font-normal mt-0">
            Paris
          </span>
        </div>
        <div className="flex justify-between">
          {teacher.location?.presentiel && (
            <div className="py-1 px-2 mr-2 bg-dark-500 rounded-full">
              <p className="text-white text-sm font-medium font-gibson">Présentiel</p>
            </div>
          )}
          <div className="py-1 px-2 mr-3 bg-dark-500 rounded-full">
            <p className="text-white text-sm font-medium font-gibson">20€\h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
