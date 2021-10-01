import { setStep, setPhone } from "actions/register.action";
import { connect } from "react-redux";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const Phone = ({ setStep, setPhone, phone }) => {
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const handleSubmit = () => {
    setStep("avatar");
    setPhone(phoneNumber);
  };
  return (
    <div>
      <h1 className="text-3xl font-gibson font-bold mb-4 cursor-pointer">
        Ton téléphone ...
      </h1>
      <PhoneInput
        country={"fr"}
        placeholder="6 51 .."
        value={phoneNumber}
        specialLabel="Ton numéro de téléphone"
        onChange={(phone) => setPhoneNumber(phone)}
      />
      <div className="flex justify-center">
        <button
          onClick={() => handleSubmit()}
          className={`
         text-gray-100 bg-primary-500 mt-10 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  phone: state.register.phone,
});

export default connect(mapStateToProps, { setStep, setPhone })(Phone);
