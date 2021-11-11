import Card from "components/ui/card";
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
    <div className="mt-5">
      <div className="flex justify-start">
        {teachers?.map((teacher, i) => (
          <Card teacher={teacher}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
