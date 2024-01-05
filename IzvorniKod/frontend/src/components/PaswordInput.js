import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ id, label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <label htmlFor={id} className="password-input-container">
      {label}
      <div className="input-with-button">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          name="password"
          value={value}
          className="input-field"
          required
          onChange={onChange}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="eye-icon"
          onClick={handleTogglePassword}
        />
      </div>
    </label>
  );
};

export default PasswordInput;
