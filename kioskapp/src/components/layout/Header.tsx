import { useStepper } from "@/services/context/stepper-context";
import { landingInfo } from "@/stores/lgu-info";
import Image from "next/image";
import router from "next/router";
import React from "react";
import Button from "../ui/Button";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Header: React.FC = () => {
  const { resetStep } = useStepper();

  const backToLandingPage = () => {
    resetStep();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 flex flex-wrap  w-full items-center justify-between py-8 px-8 shadow-[0px_17px_25px_-10px_rgba(0,0,0,0.4)] touch-none">
      <div className="flex w-full flex-wrap items-center justify-between">
        {landingInfo.map((item, index) => (
          <div key={index} className="flex container mx-auto">
            <Button
              classname="!p-0 m-0 border-none"
              onClick={() => backToLandingPage()}
            >
              <Image
                src={item.logo.src}
                alt={""}
                width={item.logo.width}
                height={item.logo.height}
                loading="eager"
                style={{ width: item.logo.width, height: item.logo.height }}
              />
            </Button>
            <div className="border-solid border-2 border-black mx-8"></div>
            <div className="flex flex-col justify-center mx-4">
              <Title
                text={item.header.title}
                textSize="text-[40px] !capitalize"
              />
              <Subtitle
                text={item.subheader.title}
                textSize="text-3xl !capitalize"
              />
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Header;
