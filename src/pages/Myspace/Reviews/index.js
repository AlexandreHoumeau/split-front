import { Rate } from "antd";
import Avatar from "components/ui/Avatar";
import React from "react";
import "antd/dist/antd.css";

const Reviews = ({ reviews = [] }) => {
  return (
    <div className="font-gibson mb-3">
      <div className="text-dark-500 font-semibold text-2xl">
        Ce qui se dit sur toi
      </div>
      {reviews.map((review) => (
        <div className="bg-white p-5 mt-5 rounded-lg" key={review._id}>
          <div className="flex space-x-2 text-primary font-gibson items-center">
            <Avatar size={8} picture={review?._student?.picture} />
            <div>
              {review._student?.firstName} {review._student?.lastName}
            </div>
          </div>

          <div className="space-y-4 mt-4 text-dark-500">
            <div className="font-semibold text-xl">« {review.title} »</div>
            <div>« {review.description} »</div>
            <Rate disabled defaultValue={review.score} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
