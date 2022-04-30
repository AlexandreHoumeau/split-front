import Button from "components/ui/button";
import DesignImage from "assets/images/design.png";
import { useHistory } from "react-router-dom";

const ReviewCard = ({ bookedCourse }) => {
  const history = useHistory();
  return (
    <div className="bg-white font-gibson relative rounded-3xl py-3 px-20 shadow-lg mb-10">
      <div className="font-gibson text-2xl font-semibold text-dark-500 mb-5">
        Donne nous ton avis sur ta formation de {bookedCourse?._course?.title}{" "}
        avec {bookedCourse?._teacher?.firstName}
      </div>
      <div className="text-center">
        Comment s’est-elle passée ? N’oublie pas de noter !{" "}
      </div>
      <div className="flex justify-center">
        <Button
          action={() => history.push(`/app/review/${bookedCourse._id}`)}
          type="secondary"
          text="LAISSER UN AVIS"
        />
        <img
          src={DesignImage}
          className="absolute h-24 w-24 -left-10 top-10"
          alt="DesignImage"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
