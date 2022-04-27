import { Rate } from "antd";
import Button from "components/ui/button";
import moment from "moment";
import React, { useEffect, useState } from "react";

const PersonalInformation = ({ user, reviews = [] }) => {
  const [scoreReview, setScoreReview] = useState();

  useEffect(() => {
    setScoreReview(
      reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length
    );
  }, [reviews]);

  console.log(user);
  return (
    <div className="bg-gray-50 font-gibson rounded-xl p-5 space-y-2">
      <div>
        <div className="text-dark-500 text-center font-semibold text-2xl">
          {user.firstName} {user.lastName}
        </div>

        {scoreReview ? (
          <div className="flex justify-center">
            <Rate
              allowHalf
              style={{ fontSize: "15px" }}
              defaultValue={scoreReview}
            />
          </div>
        ) : (
          <div className="italic text-center text-dark-50">Aucun avis</div>
        )}
      </div>

      <div className="text-base">
        {user?.location?.presentiel && (
          <div className="flex items-center space-x-1">
            <div>Lieux: </div>
            <div className="font-semibold">
              {user.location.location[0].label}{" "}
              {user.location.location.length > 1 && "..."}
            </div>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <div>Date de création de compte :</div>
          <div className="font-semibold">
            {moment(user._createdAt).format("MM/YYYY")}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div>Avis : </div>
          <div className="font-semibold">{reviews.length}</div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="secondary" text="MODIFIER" />
      </div>
    </div>
  );
};

export default PersonalInformation;
