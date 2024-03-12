import React, { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex justify-center text-center">
      <div className="flex flex-col mt-72 gap-y-16">{children}</div>
    </div>
  );
};

export default Layout;
