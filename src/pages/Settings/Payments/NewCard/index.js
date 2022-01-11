import React, { useEffect, useState } from "react";

import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Dialog } from "@headlessui/react";

import api from "services/api";
import { Spin } from "antd";

import "antd/dist/antd.css";
import SetupForm from "./SetupForm";
import { STRIPE_PUBLIC } from "config";

const stripePromise = loadStripe(STRIPE_PUBLIC);

const CheckoutForm = ({ isOpen, setIsOpen }) => {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  const getIntent = async () => {
    const { client_secret } = await api.axios("/v1/payment/secret");

    if (!client_secret) {
      return;
    }
    setOptions({
      clientSecret: client_secret,
      appearance: {
        theme: "flat",
        variables: {
          colorPrimary: "#6C63FF",
          colorText: "#4a4a4a",
          fontSizeBase: "18px",
          fontFamily: "gibson",
          borderRadius: "10px",
        },
      },
    });
  };


  useEffect(() => {
    setLoading(true);
    getIntent();
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 opacity-30" />

        <div className="relative font-gibson text-dark-500 w-1/3 bg-white p-10 rounded-xl">
          <Dialog.Title className="text-xl text-center mb-5 font-semibold">
            Ajouter une carte de crédit
          </Dialog.Title>
          {loading && (
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          )}
          <Elements stripe={stripePromise} options={options}>
            <SetupForm stopLoading={() => setLoading(false)} />
          </Elements>
        </div>
      </div>
    </Dialog>
  );
};

export default CheckoutForm;
