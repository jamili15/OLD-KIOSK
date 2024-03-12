// Icon.tsx
import Image from "next/image";
import React from "react";

interface IconProps {
  image: string;
  title: string;
  onClick?: () => void;
  size?: string; // You can customize the size as needed
  height?: number;
  width?: number;
  fontSize?: string;
  active: boolean;
}

const Icon: React.FC<IconProps> = ({
  image,
  title,
  onClick,
  height = 12,
  width = 12,
  fontSize,
  active = true,
}) => {
  return (
    <div className={`flex flex-col items-center ${active ? "" : "invisible"}`}>
      <div className="p-2 rounded-full bg-light-blue">
        <button onClick={onClick} className="p-4">
          <Image
            src={image}
            alt={"logo"}
            width={width}
            height={height}
            loading="eager"
            style={{ width: "auto" }}
          />
        </button>
      </div>
      <div className="flex justify-center items-center w-[100px]">
        <p className={`mt-4 ${fontSize}`}>{title}</p>
      </div>
    </div>
  );
};

export default Icon;
