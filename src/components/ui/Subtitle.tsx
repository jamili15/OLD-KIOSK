// Subtitle.tsx
import React from "react";

interface SubtitleProps {
  text: string;
  textSize?: string; // Optional prop for custom text size
  classname?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({
  text,
  textSize = "text-xl",
  classname,
}) => {
  return (
    <h2 className={`font-semibold text-gray-600 mb-4 ${textSize} ${classname}`}>
      {text}
    </h2>
  );
};

export default Subtitle;
