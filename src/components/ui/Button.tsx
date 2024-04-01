// Button.tsx
import useShrink from "@/hooks/useShrink";
import React, { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  buttonText?: string;
  classname?: string;
  children?: ReactNode;
  animation?: "normal" | "shrink";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  href,
  buttonText,
  classname,
  children,
  animation = "normal",
  disabled,
}) => {
  const { isShrunk, handleShrink } = useShrink();
  const defaultClass = "text-2xl px-20 py-4 rounded-lg border border-gray-400";

  const buttonProps = {
    className: `${defaultClass} ${classname || ""} ${
      animation === "shrink"
        ? isShrunk
          ? "scale-75 transition-transform duration-300 ease-out bg-gray-300"
          : ""
        : ""
    }`,
    ...(onClick
      ? {
          onClick: () => {
            handleShrink();
            onClick();
          },
        }
      : {}),
    ...(href ? { href } : {}),
    ...(disabled ? { disabled } : {}),
  };

  if (onClick) {
    return (
      <button {...buttonProps}>
        {buttonText}
        {children}
      </button>
    );
  } else {
    return (
      <a
        {...buttonProps}
        onClick={() => {
          handleShrink();
        }}
      >
        {buttonText}
        {children}
      </a>
    );
  }
};

export default Button;
