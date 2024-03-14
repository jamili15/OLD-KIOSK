/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactNode } from "react";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import Numbers from "./Number";
import Subtitle from "./Subtitle";
import Title from "./Title";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  subtitle?: string | undefined;
  queuetitle?: string | undefined;
  title?: string;
  number?: number | undefined;
  cityname?: string | undefined;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  children?: ReactNode;
  numberLayout?: string;
  textButton?: string | undefined;
  href?: string;
  onClick?: () => void;
  showClose?: string;
  alt?: string;
  buttonLayout?: string;
  seriesno?: string;
  date?: string;
  qrcontent?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  subtitle,
  queuetitle,
  title,
  number,
  paragraph1,
  paragraph2,
  paragraph3,
  children,
  numberLayout,
  textButton,
  href,
  onClick,
  showClose,
  alt,
  buttonLayout,
  cityname,
  seriesno,
  date,
  qrcontent,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center z-[1] `}
    >
      <div
        className={`w-[60%] flex flex-col items-center gap-10 bg-white p-6 rounded-2xl z-10 relative ${className}`}
      >
        <div className={`flex justify-end w-full ml-36 ${showClose}`}>
          <Button onClick={onClose} classname="text-[#333] border-none">
            <MdOutlineClose size={50} />
          </Button>
        </div>
        {children}
        <Title text={queuetitle || ""} textSize="text-[27px]" />
        <div>
          <Title text={cityname || ""} />
          <Title text={seriesno || ""} />
          <Title text={date || ""} />
        </div>

        <div className=" w-full">
          <Subtitle
            text={subtitle || ""}
            textSize="text-[20px] uppercase font-semibold text-center"
          />
          <Title
            text={title || ""}
            textSize="text-red-500 text-[29px] text-center capitalize"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Numbers
            number={number}
            textSize={`text-[50px] font-bold ${numberLayout}`}
          />
        </div>
        <div>
          <Button
            buttonText={textButton}
            href={href}
            classname={`bg-light-blue text-white ${buttonLayout}`}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
