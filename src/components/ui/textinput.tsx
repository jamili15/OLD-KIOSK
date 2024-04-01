import { useEffect, useRef } from "react";
import { useKeyboardContext } from "../keyboard/KeyboardContext";

interface CustomTextInputProps {
  label?: string;
  initialValue?: string;
  placeholder?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  initialValue = "",
  placeholder,
}) => {
  const context = useKeyboardContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (context.activeInput === inputRef) {
      inputRef.current?.focus();
    }
  }, [context.activeInput]);

  function focusHandler() {
    if (inputRef.current) {
      context.setActiveInput(inputRef);
    }
  }

  return (
    <div>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        ref={inputRef}
        id={label}
        defaultValue={initialValue}
        onFocus={focusHandler}
        placeholder={placeholder}
        className="border-4 border-blue-500 p-4 rounded-2xl flex text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[600px] h-[100px] text-5xl"
      />
    </div>
  );
};

export default CustomTextInput;
