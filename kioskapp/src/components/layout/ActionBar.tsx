import React, { ReactNode } from "react";

interface ActionBarProps {
  children?: ReactNode;
  backRoute?: (() => void) | string;
  nextRoute?: (() => void) | string; // Update the type of nextRoute
  className?: string;
  hideNextButton?: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ children }) => {
  return (
    <div className="fixed left-[170px] bottom-[150px] flex justify-start gap-x-60">
      {children}
    </div>
  );
};

export default ActionBar;
