import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import api from "services/api";
import Counter from "./teacher/counter";

const MySpace = ({ user }) => {
  const [teacherInformations, setTeacherInformations] = useState();

  const getTeacherInformations = async () => {
    const data = await api.axios.get("/v1/me/informations");
    setTeacherInformations(data);
  };
  useEffect(() => {
    getTeacherInformations();
  }, []);
  return (
    <div>
      {user.profile === "teacher" && (
        <div className="flex ml-10 mt-10">
          {<Counter information={teacherInformations} />}
        </div>
      )}
      <div>This is the part of the student</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(MySpace);
