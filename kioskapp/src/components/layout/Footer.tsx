import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-[0px_25px_17px_25px_rgba(0,0,0,0.4)] p-4 ">
      <div className="flex justify-center items-center">
        <Image
          src="/images/etracs-logo.png"
          alt="Logo"
          width={150}
          height={0}
          loading="eager"
          style={{ width: 150, height: 50 }}
        />
      </div>
    </footer>
  );
};

export default Footer;

//shadow-[0px_17px_25px_-10px_rgba(0,0,0,0.4)]
