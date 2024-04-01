// KeyboardKey.tsx
import useShrink from "@/hooks/useShrink";
import Image from "next/image";
import React from "react";
import { useKeyboardContext } from "../keyboard/KeyboardContext";

interface KeyboardKeyProps {
  value: string;
  onClick?: () => void;
  customStyles?: React.CSSProperties;
  animation?: "normal" | "shrink";
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  value,
  onClick,
  customStyles,
  animation,
}) => {
  const context = useKeyboardContext();

  const { isShrunk, handleShrink } = useShrink();

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (context.activeInput && context.activeInput.current) {
      const inputElement = context.activeInput.current;
      const currentValue = inputElement.value;
      const selectionStart = inputElement.selectionStart || 0;
      const selectionEnd = inputElement.selectionEnd || 0;

      if (onClick) {
        onClick();
      } else {
        const newValue =
          currentValue.substring(0, selectionStart) +
          value +
          currentValue.substring(selectionEnd);
        inputElement.value = newValue;
        const newCursorPosition = selectionStart + value.length;
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
      }
      inputElement.focus();
    }
  };

  const renderKeyContent = () => {
    if (value === "Bks") {
      return (
        <Image
          src={"/icons/backspace.png"}
          alt={"Backspace"}
          width={0}
          height={0}
          loading="eager"
          style={{ width: "65%", height: "45%" }}
          unoptimized
          priority
        />
      );
    } else if (value === "SpaceBar") {
      return <div style={{ width: "600px" }} />;
    } else {
      return value;
    }
  };

  return (
    <div
      tabIndex={-1}
      className={`flex items-center justify-center w-full h-20 m-1 rounded-md border-gray-300 border-2 shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)] ${
        animation === "shrink"
          ? isShrunk
            ? "scale-95 transition-transform duration-150 bg-gray-200 ease-out"
            : ""
          : ""
      }`}
      onClick={(e) => {
        clickHandler(e);
        handleShrink();
      }}
    >
      {renderKeyContent()}
    </div>
  );
};

export default KeyboardKey;
