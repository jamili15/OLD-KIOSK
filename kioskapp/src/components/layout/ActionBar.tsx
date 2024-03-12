import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface ActionBarProps {
  children?: ReactNode;
  backRoute?: (() => void) | string;
  nextRoute?: (() => void) | string; // Update the type of nextRoute
  className?: string;
  hideNextButton?: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({
  backRoute,
  nextRoute,
  hideNextButton,
  children,
  className,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (backRoute) {
      if (typeof backRoute === "function") {
        backRoute();
      } else {
        router.push(backRoute);
      }
    }
  };

  const handleNext = () => {
    if (nextRoute) {
      if (typeof nextRoute === "function") {
        nextRoute();
      } else {
        router.push(nextRoute);
      }
    }
  };

  return (
    <div className="fixed left-[190px] bottom-[150px] flex justify-start gap-x-64">
      {children}
    </div>
  );
};

export default ActionBar;

{
  /* <div className="text-[30px] gap-56 flex justify-center items-center w-full">
  <Button buttonText={"Back"} onClick={handleBack} />
  {!hideNextButton && (
    <Button
      buttonText={"Next"}
      onClick={handleNext}
      classname={`bg-light-blue text-white ${className}`}
    />
  )}
</div>; */
}
