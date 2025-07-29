import React from "react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "muted";
}

function Button({
  children,
  onClick,
  className,
  type = "button",
  size = "md",
  variant = "primary",
}: ButtonProps) {
  const baseStyle =
    "rounded-md font-medium transition-colors duration-200 hover:cursor-pointer";

  const sizeStyle = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[size];

  const variantStyle = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    muted: "bg-slate-500 text-white hover:bg-slate-600",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyle, sizeStyle, variantStyle, className)}
    >
      {children}
    </button>
  );
}

export default Button;
