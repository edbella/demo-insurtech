import React, { ButtonHTMLAttributes } from "react";
import "./styles/button.scss";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return <button {...props} className="brand-button" />;
};

export default Button;
