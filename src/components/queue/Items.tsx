import React from "react";
import Button from "../ui/Button";

interface QueueItemProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

const QueueItem: React.FC<QueueItemProps> = ({ title, className, onClick }) => {
  return (
    <div className="flex justify-center items-center ">
      <div
        className={`w-full h-24 flex items-center justify-center  border border-[#335F96] rounded-xl shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)] ${className}`}
      >
        <Button
          buttonText={title}
          classname="border-none text-2xl font-bold w-full h-full !px-5 "
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default QueueItem;
