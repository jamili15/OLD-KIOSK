// Title.tsx
import React from "react";

interface TitleProps {
  text: string | undefined;
  textSize?: string; // Optional prop for custom text size
  classname?: string;
}

const Title: React.FC<TitleProps> = ({
  text,
  textSize = "text-3xl",
  classname,
}) => {
  return <h1 className={`font-bold ${textSize} ${classname}`}>{text}</h1>;
};

export default Title;
