import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface DropdownProps {
  caption?: string;
  options: number[] | string[];
  className?: string;
  onChange: (option: number | string) => void; // Add the onChange prop
}

const Dropdown: React.FC<DropdownProps> = ({
  caption,
  options,
  className,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | string | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: number | string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`inline-flex justify-between w-[400px] h-[100px] items-center px-4 py-2 text-[30px] font-medium text-gray-700 bg-white border-b-4 border-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-400 ${
          isOpen ? "rounded-t-md" : "rounded-md"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption || caption}
        <AiFillCaretDown aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 space-y-2 bg-white border z-[1] border-gray-300 rounded-md shadow-lg w-full text-[30px]"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 relative z-[1] ${className}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={option === selectedOption}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
