import { Form, Rate } from "antd";
import Button from "components/ui/button";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "services/api";

const Review = () => {
  const { courseId } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState();
  const [rate, setRate] = useState(3.5)
  const [form] = Form.useForm();

  const fetchReview = async () => {
    try {
      const { bookedCourse } = await api.axios.get(`/v1/review/${courseId}`);
      setCourse(bookedCourse);
    } catch (error) {}
  };

  const submitReview = async (values) => {
    try {
      const { title, description } = values

      await api.axios.post(`/v1/review`, {
        title,
        description,
        score: rate,
        _teacher: course._teacher._id,
        _student: course._student,
        _bookedCourse: course._id
      });
      history.push("/app/home");
    } catch (error) {}
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className="">
      <div className="bg-white flex items-center justify-between w-full  px-10 py-5">
        <div className="flex items-center">
          <div className="ml-20 relative">
            <img
              alt="avatar"
              className="object-cover h-60 w-80 rounded-4xl"
              src={course?._teacher?.picture}
            />
          </div>

          <div className="ml-10">
            <div className="text-3xl text-dark-500 font-gibson font-semibold">
              {course?._teacher?.firstName}
            </div>
            <div className="text-3xl text-dark-500 font-gibson">
              {course?._teacher?.sector === "market"
                ? "Marketing"
                : course?._teacher?.sector === "design"
                ? "Designer"
                : "Developpeur"}
            </div>
            <div className="text-3xl text-dark-500 font-gibson">Paris</div>
          </div>
        </div>
      </div>
      <Form initialValues={{ score: 3.5, title: null, description: null }} onFinish={submitReview} form={form}>
        <div className="m-10 space-y-10 font-gibson">
          <div className="space-y-4">
            <div className="text-3xl text-dark-500 font-gibson font-semibold">
              Note globale
            </div>
            <Form.Item name="score" rules={[{ required: true }]}>
              <div className="bg-white rounded-3xl p-5">
                <Rate value={rate} onChange={(value) => setRate(value)} allowHalf style={{ fontSize: "30px" }} />
              </div>
            </Form.Item>
          </div>

          <div className="space-y-4">
            <div className="text-3xl text-dark-500 font-gibson font-semibold">
              Titre de l'avis
            </div>
            <Form.Item name="title" rules={[{ required: true }]}>
              <div className="bg-white rounded-3xl p-5">
                <input
                  placeholder="Résumé en une phrase la formation que tu as suivi"
                  className="w-full outline-none border-transparent focus:border-transparent focus:ring-0 p-2 text-xl"
                />
              </div>
            </Form.Item>
          </div>

          <div className="space-y-4">
            <div className="text-3xl text-dark-500 font-gibson font-semibold">
              Contenu de l’avis
            </div>
            <Form.Item name="description" rules={[{ required: true }]}>
              <div className="bg-white rounded-3xl p-5">
                <textarea
                  placeholder="Fais part de ton expérience. Quelle formation ? Combien de temps ? Y a t-il eu un suivi derrière ?"
                  className="w-full outline-none border-transparent focus:border-transparent focus:ring-0 p-2 text-xl"
                />
              </div>
            </Form.Item>
          </div>

          <div className="flex justify-center">
            <Button type="primary" text="ENVOYER" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Review;
