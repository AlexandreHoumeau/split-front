import React from "react";

const Card = ({ teacher }) => {
  return (
    <div className="bg-white w-1/2 shadow-md h-42 mx-3 rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5">
      <img
        className="h-10 w-full sm:h-full sm:w-1/2 object-cover"
        src={teacher?.photo[0].data_url}
        alt="profile_picture"
      />
      <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
        <div className="flex flex-col justify-start items-baseline">
          <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
            {teacher.firstName} - {teacher.lastName}
          </h1>
          <span className="text-md font-gibson font-semibold text-primary-300 mt-0">
            {teacher.bio}
          </span>
        </div>
        <div className="flex mt-10 w-full">
          {teacher.location?.presentiel && (
            <div className="py-1 px-4 mr-3 bg-primary-300 rounded-full">
              <p className="text-white font-semibold font-gibson">Paris</p>
            </div>
          )}
          {teacher.location?.presentiel && (
            <div className="py-1 mr-5 px-4 bg-secondary-400 rounded-full">
              <p className="text-white font-semibold font-gibson">Visio</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
