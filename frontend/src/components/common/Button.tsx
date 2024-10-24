import React, { ReactNode } from "react";

// Definiera typerna för komponentens props
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // Tillåter att lägga till egna klasser om det behövs
}

const ButtonComponent: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
