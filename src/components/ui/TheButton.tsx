import React, { MouseEventHandler } from "react";

import classes from "./styles/TheButton.module.css";

type ButtonProps = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  width?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};
export default function TheButton({
  label,
  onClick,
  type,
  variant,
  width,
  disabled,
}: ButtonProps) {
  const primaryButton = classes.btn_primary;
  const secondayButton = classes.btn_secondary;

  return (
    <button
      className={`${
        variant === "primary" ? primaryButton : secondayButton
      } ${width}  ${disabled ? "opacity-20" : "opacity-100"}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
