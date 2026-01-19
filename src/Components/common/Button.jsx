import React from "react";
import { LoadingSvg } from "../assets/svgs";

function Button({
  text = "Button",
  color = "transparent",
  loading = false,
  loadingtext = "",
  className = "",
  onClick,
  type,
  icon = null,
  iconPosition = "left",
  disabled,
}) {
  const baseStyle = `px-4 py-2 rounded-md text-white font-medium transition duration-300`;
  const disabledStyle =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const colorMap = {
    primary: "bg-primary hover:bg-primary/40",
    secondary: "bg-secondary hover:bg-secondary/40",
    transparent: "bg-transparent border border-border-color hover:bg-white/10",
    gray: "bg-gray-150  hover:bg-gray-150/10",
  };
  const bgColor = colorMap[color] || colorMap.primary;

  const renderContent = () => {
    if (loading) {
      return (
        <span className="flex items-center justify-center gap-1">
          {loadingtext} <LoadingSvg />
        </span>
      );
    }

    return (
      <span className="flex items-center justify-center gap-2">
        {icon && iconPosition === "left" && icon}
        {text}
        {icon && iconPosition === "right" && icon}
      </span>
    );
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${bgColor} ${disabledStyle} ${className}`}
      disabled={disabled}
      type={type || "button"}
    >
      {renderContent()}
    </button>
  );
}

export default Button;
