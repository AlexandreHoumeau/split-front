import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const PasswordStrength = ({ password }) => {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(null);
  useEffect(() => {
    checkpassword(password);
  }, [password]);

  function checkpassword(password) {
    var strength = 0;
    if (password.length > 15) {
      strength += 1;
    }
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!/]+/)) {
      strength += 1;
    }

    switch (strength) {
      case 0:
        setIndex(0);
        setWord(null);
        break;
      case 1:
        setIndex(10);
        setWord("faible");
        break;
      case 2:
        setIndex(50);
        setWord("moyen");
        break;
      case 3:
        setIndex(75);
        setWord("fort");
        break;
      case 4:
        setIndex(100);
        setWord("super fort");
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div className="mt-5">
        <div className=" h-2 bg-gray-100 relative border-r-1">
          <div
            style={{ width: `${index}%` }}
            className={`${
              index === 50 ? "bg-yellow-500" : "bg-red-500"} 
              ${index > 50 ? "bg-green-500" : "bg-red-500"}
              transition-all duration-300 rounded h-2 absolute`}
          />
        </div>
      </div>
      {word && (
        <div className="flex justify-end mt-2">
          <p className="font-gibson text-sm">
            Mot de passe <span className="text-primary font-semibold">{word}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
