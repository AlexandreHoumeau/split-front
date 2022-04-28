import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "services/api";

const Review = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState()
  const fetchReview = async () => {
    try {
      const { bookedCourse } = await api.axios.get(`/v1/review/${courseId}`);
      setCourse(bookedCourse)
    } catch (error) {}
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div>

    </div>
  )
};

export default Review;
