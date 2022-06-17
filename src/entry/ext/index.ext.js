import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import "./index.ext.scss";

const renderExtensionInContentScript = true;

if (renderExtensionInContentScript) {
  const app = document.createElement("span");
  app.id = "extension-root";
  document.body.appendChild(app);

  ReactDOM.render(<App />, app);
} else {
  // render in popup
  ReactDOM.render(<App />, document.getElementById("root"));
}
