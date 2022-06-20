import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import api from "services/api";
import FurtherCourses from "./FurtherCourses";
import PastCourses from "./PastCourses";
import PersonalInformation from "./PersonalInformation";
import Reviews from "./Reviews";
import Counter from "./teacher/counter";

const MySpace = ({ user }) => {
  const [teacherInformations, setTeacherInformations] = useState();

  const getTeacherInformations = async () => {
    try {
      const data = await api.axios.get("/v1/me/informations");
      setTeacherInformations(data);
    } catch (error) {}
  };
  useEffect(() => {
    getTeacherInformations();
  }, []);
  return (
    <div className="xl:grid grid-cols-6 space-x-8">
      <div className="col-span-4">
        {user.profile === "teacher" && (
          <div className="ml-10 mt-10">
            {<Counter information={teacherInformations} />}
          </div>
        )}

        <div className="ml-10 mt-10">
          <PastCourses courses={teacherInformations?.tookCourses}/>
          <Reviews reviews={teacherInformations?.reviews} />
        </div>
      </div>

      <div className="bg-white xl:rounded-none rounded-lg col-span-2 space-y-4 p-10">
        <PersonalInformation
          user={user}
          reviews={teacherInformations?.reviews}
        />
        <FurtherCourses furtherCourses={teacherInformations?.furtherCourses} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(MySpace);
