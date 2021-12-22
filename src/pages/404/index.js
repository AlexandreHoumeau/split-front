import Button from "components/ui/button";
import React from "react";
import { useHistory } from "react-router";

const ErrorPage = () => {
  const history = useHistory()
  return (
    <div className={"min-h-screen bg-primary-400"}>
      <div className="w-40 h-40 absolute bg-primary-300 rounded-full top-0 right-12 hidden md:block" />
      <div className="w-20 h-40 absolute bg-primary-300  rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>

      <div className="flex items-center justify-center h-screen">
        <div className="font-gibson text-center">
        <div className="font-bold text-9xl ">404</div>
          <div className="text-3xl font-semibold">Il semblerai qu'il y est un problème</div>
          <div className="flex justify-center">
            <Button type="secondary" text="Revenir sur la home" action={() => history.push('/app/home')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
