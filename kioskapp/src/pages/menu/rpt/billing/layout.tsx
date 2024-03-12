import React, { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen touch-none">
      <div className="pt-64 p-8">{children}</div>
    </div>
  );
};

export default Layout;
