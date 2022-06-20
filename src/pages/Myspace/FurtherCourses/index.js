import Button from "components/ui/button";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import api from "services/api";

const FurtherCourses = ({ furtherCourses = [] }) => {
  const history = useHistory();
  const contactTeacher = async (course) => {
    try {
      const data = await api.axios.post("/v1/conversation", {
        userId: course._student._id,
      });

      if (data.conversation) {
        history.push(`/app/messenger/${data.conversation._id}`);
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="bg-gray-50 font-gibson rounded-xl p-5 space-y-2">
      {furtherCourses?.length ? (
        <div>
          <div className="text-dark-500 font-semibold text-xl mb-5">
            À venir
          </div>
          {furtherCourses.map((course) => (
            <div className="space-y-2 font-gibson" key={course._id}>
              <div className="text-primary">
                {moment(course._createdAt).format("DD MMMM YYYY")}
              </div>
              <div className="grid grid-cols-6">
                <div className="text-secondary col-span-1">
                  <div>{moment(course._createdAt).format("hh:mm")}</div>
                  <div className="mt-10">
                    {moment(course._createdAt).add("hours", 1).format("hh:mm")}
                  </div>
                </div>

                <div className="bg-white row-auto p-2 col-span-5">
                  <div>{course._course?.title}</div>
                  <div>1h</div>
                  <div className="flex space-x-2 text-primary font-gibson items-center">
                    <div>
                      {course._student?.firstName} {course._student?.lastName}
                    </div>
                  </div>
                  <div
                    onClick={() => contactTeacher(course)}
                    className="font-semiBold cursor-pointer text-secondary-500"
                  >
                    Contacter
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center italic text-dark-50">
          Aucunes formations à venir
        </div>
      )}
    </div>
  );
};

export default FurtherCourses;
