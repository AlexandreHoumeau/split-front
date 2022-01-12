import classNames from "classnames";
import React from "react";

const Avatar = ({picture, size}) => {
  return (
    <div className="relative">
      <img
        className={
          classNames(
            'inline-block  rounded-full ring-2 ring-white object-cover',
            size ? `h-${size} w-${size}` : 'h-20 w-20'
        )}
        src={picture}
        alt="avatar"
      />
      <div className="w-4 h-4 absolute right-0 bottom-1 ring-white ring bg-primary-500 rounded-full" />
    </div>
  );
};

export default Avatar;
