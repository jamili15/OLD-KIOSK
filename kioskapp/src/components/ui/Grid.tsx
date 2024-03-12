import React, { ReactNode } from "react";

interface GridProps {
  children?: ReactNode;
  columns: string;
}

const Grid: React.FC<GridProps> = ({ children, columns }) => {
  return <div className={`grid ${columns}`}>{children}</div>;
};

export default Grid;
