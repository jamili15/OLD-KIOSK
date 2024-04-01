import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

interface AlertProps {
  img: {
    src: string;
    height?: number;
    width?: number;
  };
  isOpen: boolean;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps & { errorMessage: string }> = ({
  isOpen,
  onClose,
  errorMessage,
  img,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-[#00000080] flex flex-col justify-center items-center z-[1]`}
    >
      <div className="w-[60%] flex flex-col items-center gap-2 bg-white p-6 rounded-2xl z-10">
        <div className="flex flex-col gap-20 text-center justify-center items-center m-8 uppercase">
          {errorMessage && <div className="text-4xl">{errorMessage}</div>}
          <div className="flex justify-center items-center">
            <Image
              src={img?.src || ""}
              alt={"logo"}
              width={img?.width}
              height={img?.height}
              loading="eager"
              style={{ width: img?.width, height: img?.height }}
            />
          </div>
          <Button buttonText={"OK"} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Alert;
