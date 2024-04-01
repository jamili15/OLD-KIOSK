// Layout.tsx
import { landingBgLogo } from "@/stores/lgu-info";
import Image from "next/image";
import React, { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
  classname?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, classname }) => {
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  } as const;

  return (
    <div style={containerStyle} className={`touch-none ${classname}`}>
      {landingBgLogo.map((item, index) => (
        <div key={index} className="bg-auto bg-no-repeat bg-center">
          <Image
            src={item.logo.src}
            alt={""}
            width={item.logo.width}
            height={item.logo.height}
            style={{
              content: '""',
              position: "absolute",
              top: 450,
              right: 0,
              left: 0,
              opacity: 0.4,
              zIndex: -1,
              width: item.logo.width,
              height: item.logo.height,
            }}
            loading="eager"
            priority
            unoptimized
          />
        </div>
      ))}
      <div className={`text-center m-8 ${classname}`}>{children}</div>
    </div>
  );
};

export default Layout;
