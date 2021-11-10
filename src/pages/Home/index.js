import React, { useEffect, useState } from "react";
import api from "services/api";

const Home = () => {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    await api.axios.get("/v1/teacher/list").then((res) => {
      if (res) {
        setTeachers(res.teachers)      
      }
    });
  };

  return (
    <div>
      <div>
        {teachers?.map((teacher, i) => (
          <div key={i}>
            <p>{teacher.firstName} {teacher.lastName}</p>
            <p>{teacher.bio}</p>
            <p>Paris</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
