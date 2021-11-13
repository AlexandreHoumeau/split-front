import React from "react";

const Card = ({ teacher }) => {
  console.log(teacher)
  return (
    <div className=" bg-blueGray-50 w-1/4 shadow-md mx-3 rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-1/2">
      <img
        className="w-full sm:h-full sm:w-24 object-cover"
        src={teacher?.photo[0].data_url}
        alt="profile_picture"
      />
      <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/3 pl-6 sm:h-full sm:items-baseline sm:w-3/5">
        <div className="flex flex-col justify-start items-baseline">
          <h1 className="text-lg font-semibold mb-0 text-dark-500 font-gibson">
            {teacher.firstName} - {teacher.lastName}
          </h1>
          <span className="text-md font-gibson text-dark-500 font-normal mt-0">
            {teacher.bio}
          </span>
          <span className="text-md font-gibson text-dark-500 font-normal mt-0">
            Paris
          </span>
        </div>
        <div className="flex mt-10 w-full">
          {teacher.location?.presentiel && (
            <div className="py-1 px-4 mr-3 bg-primary-300 rounded-full">
              <p className="text-white font-semibold font-gibson">Paris</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
