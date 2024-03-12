import React from "react";

interface NumberProps {
  number?: number;
  text?: string;
  classname?: string;
  textSize?: string;
}

const Numbers: React.FC<NumberProps> = ({
  number,
  classname,
  text,
  textSize,
}) => {
  return (
    <div>
      <p className={`text-4xl ${classname} ${textSize}`}>
        {text} {number !== undefined ? number : ""}
      </p>
    </div>
  );
};

export default Numbers;
