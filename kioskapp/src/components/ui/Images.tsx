// Image.tsx
import Image from "next/image";
import React, { ReactNode } from "react";

interface ImagesProps {
  img?: string;
  size?: "small" | "medium" | "large" | "custom"; // You can customize the sizes as needed
  alt?: string;
  classname?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
}

const Images: React.FC<ImagesProps> = ({
  img,
  size,
  alt,
  classname,
  width,
  height,
  children,
}) => {
  let imageSizeClass = "";

  if (size) {
    switch (size) {
      case "small":
        imageSizeClass = "w-16 h-16"; // Customize with your small size styles
        break;
      case "medium":
        imageSizeClass = "w-32 h-32"; // Customize with your medium size styles
        break;
      case "large":
        imageSizeClass = "w-48 h-48"; // Customize with your large size styles
        break;
      case "custom":
        imageSizeClass = "w-64 h-16"; // Example of custom size with small height and large width
        break;
      default:
        break;
    }

    return (
      <Image
        src={img || ""}
        alt={alt || ""}
        className={`${imageSizeClass} ${classname}`}
      />
    );
  } else {
    const containerStyle: React.CSSProperties = {
      width: "100%", // Adjust based on your layout needs
      height: "auto",
    };

    const imageStyle: React.CSSProperties = {
      width: width ? `${width}px` : "100%", // Set width if provided, otherwise full width
      height: height ? `${height}px` : "auto", // Set height if provided, otherwise auto
    };

    return (
      <div style={containerStyle} className={classname}>
        <Image
          src={img || ""}
          alt={alt || ""}
          style={imageStyle}
          className="w-full h-auto"
        />
        {children}
      </div>
    );
  }
};

export default Images;
