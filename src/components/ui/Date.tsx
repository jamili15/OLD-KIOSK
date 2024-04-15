// components/CurrentDate.tsx

import React from "react";

const CurrentDate: React.FC = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  return (
    <div>
      <p>{`${month}/${day}/${year}`}</p>
    </div>
  );
};

export default CurrentDate;
