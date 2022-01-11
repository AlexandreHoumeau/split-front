import React from "react";
import * as Icons from "assets/icons";
import { Spin } from "antd";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

const Button = ({ text, type, action, icon, isLoading }) => {
  return (
    <button
      type="submit"
      onClick={action}
      className={`bg-${type} ${
        icon ? "py-3 px-4" : "py-4 px-14"
      } mt-5 rounded-4xl flex items-center justify-between`}
    >
      {icon && (
        <Icon
          className="w-5 h-5 mr-2"
          color="white"
          aria-hidden="true"
          icon={icon}
        />
      )}
      <div className="text-white font-gibson font-semibold text-sm">{text}</div>
      {isLoading && (
        <div className="ml-2">
          <Spin size="default" />
        </div>
      )}
    </button>
  );
};

export default Button;
