import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import Button from "components/ui/button";
import { toast } from "react-toastify";
import { Spin } from "antd";

const SetupForm = ({ stopLoading }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsValidating(true);
    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/app/settings/payment",
      },
    });

    if (error) {
      toast.error(error.message);
      setErrorMessage(error.message);
    } else {
      toast.success('Carte bien enregistré')
    }
    setIsValidating(false);
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <PaymentElement onReady={stopLoading} />
      <div className="flex justify-center">
        <Button text="Ajouter" type="primary" isLoading={isValidating} />
      </div>
      {errorMessage && (
        <div className="text-center font-gibson text-red-500 mt-2 font-semibold">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default SetupForm;
