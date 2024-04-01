import React, { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex justify-center text-center touch-none">
      <div className="flex flex-col mt-72 m-8 w-full gap-y-8">{children}</div>
    </div>
  );
};

export default Layout;
