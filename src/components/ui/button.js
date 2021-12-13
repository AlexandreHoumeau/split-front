import React from "react";
import * as Icons from "assets/icons";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

const Button = ({ text, type, action, icon }) => {
  return (
    <button
      type="submit"
      onClick={action}
      className={`bg-${type} ${icon ? 'py-3 px-4' : 'py-4 px-14' } mt-5 rounded-4xl flex`}
    >
      {icon && (
        <Icon className="w-5 h-5 mr-2" color="white" aria-hidden="true" icon={icon} />
      )}
      <div className="text-white font-gibson font-semibold text-sm">
        {text}
      </div>
    </button>
  );
};

export default Button;
