import React from "react";

const Input = ({
  handleChange,
  id,
  placeholder,
  handleBlur,
  value,
  label,
  error,
  type
}) => {
  return (
    <>
      <div
        className={`text-sm font-gibson mt-10 font-semibold ${
          error ? "text-red-500" : "text-dark-500"
        } tracking-wide`}
      >
        {label}
      </div>
      <input
        className={`w-full font-gibson text-lg rounded p-4 border ${
          error ? "border-red-300" : "border-primary-500"
        } focus:outline-none focus:border-primary-500`}
        type={type ? type : 'text'}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {error && <div className="text-red-500 font-gibson">{error}</div>}
    </>
  );
};

export default Input;
