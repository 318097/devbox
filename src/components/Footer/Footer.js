import React from "react";
import { StatusBar } from "@codedrops/react-ui";
import tracker from "../../lib/mixpanel";

const Footer = () => {
  return (
    <footer>
      <div className="fcc gap">
        <StatusBar />
      </div>
      <div className="fcc gap"></div>
    </footer>
  );
};

export default Footer;
