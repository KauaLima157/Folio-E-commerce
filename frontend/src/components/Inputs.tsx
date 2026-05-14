import type { ChangeEvent } from "react";
import { useState } from "react";
import style from "../styles/components/inputs.module.css";

type InputProps = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  textLabel: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  isPassword?: boolean;
};

export function Inputs({
  type,
  name,
  id,
  placeholder,
  textLabel,
  handleChange,
  icon,
  isPassword = false
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className={style.container}>
      <label className={style.label} htmlFor={id}>
        {textLabel}
      </label>

      <div className={style.inputWrapper}>
        {icon && <span className={style.icon}>{icon}</span>}

        <input
          className={style.input}
          type={inputType}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={handleChange}
        />

        {isPassword && (
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}