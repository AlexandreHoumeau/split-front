import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import api from "services/api";
import Counter from "./teacher/counter";

const MySpace = ({ user }) => {

  const getTeacherInformations = async () => {
    const { teacher } = await api.axios.get('/v1/me/informations')
    console.log(teacher)
  }
  useEffect(() => {
    getTeacherInformations()
  }, [])
  return (
    <div>
      {user.profile === 'teacher' && <div>{<Counter />}</div>}
      <div>This is the part of the student</div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(MySpace);
