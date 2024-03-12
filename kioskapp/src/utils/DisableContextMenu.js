// components/DisableContextMenu.js

import { useEffect } from "react";

const DisableContextMenu = ({ children }) => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      // event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return <div>{children}</div>;
};

export default DisableContextMenu;
