import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
};
const variants = {
  outline: {
    gray_800: "border-gray-800 border border-solid text-gray-800",
    gray_500: "border-gray-500 border-2 border-solid text-gray-500",
  },
  fill: {
    white_A700: "bg-white-A700 text-gray-800",
    gray_800: "bg-gray-800 text-white-A700",
  },
};
const sizes = {
  "6xl": "h-[64px] px-[35px] text-lg",
  "4xl": "h-[60px] px-2.5",
  xl: "h-[53px] px-[34px] text-sm",
  "2xl": "h-[56px] px-2.5 text-2xl",
  "3xl": "h-[60px] px-[33px] text-2xl",
  md: "h-[48px] px-[34px] text-sm",
  xs: "h-[24px] px-[5px]",
  sm: "h-[48px] px-4",
  "7xl": "h-[103px] px-[33px] text-lg",
  "5xl": "h-[60px] px-7 text-lg",
  lg: "h-[50px] px-[22px] text-lg",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  variant = "fill",
  size = "lg",
  color = "gray_800",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square"]),
  size: PropTypes.oneOf(["6xl", "4xl", "xl", "2xl", "3xl", "md", "xs", "sm", "7xl", "5xl", "lg"]),
  variant: PropTypes.oneOf(["outline", "fill"]),
  color: PropTypes.oneOf(["gray_800", "gray_500", "white_A700"]),
};

export { Button };
