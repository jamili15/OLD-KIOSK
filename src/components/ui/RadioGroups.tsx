import React from "react";

interface RadioGroupProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {options.map((option) => (
        <div
          key={option.value}
          className="mb-2 text-4xl flex justify-start items-center text-center gap-5"
        >
          <input
            type="radio"
            id={option.value}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="mr-5 h-10 w-10" // Customize the size using h-6 and w-6 classes
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
