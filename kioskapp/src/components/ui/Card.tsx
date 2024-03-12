import Image from "next/image";
import Title from "./Title";

interface CardProps {
  image: {
    img: string;
    classname?: string;
    height?: number;
    width?: number;
  };
  title: {
    label: string;
    classname?: string;
  };
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ image, title, onClick }) => {
  return (
    <div
      className={`relative flex flex-col text-gray-700 bg-white shadow-2xl rounded-lg w-96 border-4`}
      onClick={onClick}
    >
      <div
        className={`flex justify-center items-center p-14 ${image.classname}`}
      >
        <Image
          src={image.img}
          alt={""}
          height={image.height}
          width={image.width}
          loading="eager"
        />
      </div>

      <div className="p-6 text-center">
        <Title
          text={title.label}
          classname={`block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 ${title.classname}`}
        />
      </div>
    </div>
  );
};

export default Card;
