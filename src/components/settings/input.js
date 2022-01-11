import classNames from "classnames";
import React from "react";

const Input = ({
  handleChange,
  disable,
  containerClass,
  id,
  placeholder,
  handleBlur,
  value,
  labelClass,
  defaultValue,
  label,
  error,
  type,
}) => {
  return (
    <div className={containerClass}>
      <div
        className={classNames(
          "tracking-wide text-sm font-gibson font-semibold",
          error ? "text-red-500" : "text-dark-500",
          disable ? "text-gray-300" : "",
          labelClass
        )}
      >
        {label}
      </div>
      <input
        disabled={disable}
        className={classNames(
          "w-full font-gibson text-lg rounded p-4 border focus:outline-none focus:border-primary-500",
          error ? "border-red-300" : "border-primary-500",
          disable ? "bg-gray-100" : ""
        )}
        type={type ? type : "text"}
        defaultValue={defaultValue}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {error && <div className="text-red-500 font-gibson">{error}</div>}
    </div>
  );
};

export default Input;
