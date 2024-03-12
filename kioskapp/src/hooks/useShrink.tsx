// useShrink.ts
import { useState } from "react";

const useShrink = () => {
  const [isShrunk, setShrunk] = useState(false);

  const handleShrink = () => {
    setShrunk(!isShrunk);

    setTimeout(() => {
      setShrunk(false);
    }, 300); // Increase the duration for a smoother transition
  };

  return { isShrunk, handleShrink };
};

export default useShrink;
