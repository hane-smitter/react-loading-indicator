import React from "react";
import "./Button.scss";
import { ButtonProps } from "./Button.types";

const Button = (props: ButtonProps) => {
  return <button>{props.label}</button>;
};

export { Button };
