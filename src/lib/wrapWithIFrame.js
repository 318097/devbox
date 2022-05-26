import React from "react";
import Frame from "react-frame-component";

const head = [];

const styleTags = document.head.querySelectorAll(".webpack-compiled-tags");

styleTags.forEach((link) => {
  if (link.textContent) {
    const node = <style>{link.textContent}</style>;
    head.push(node);
  }

  link.remove();
});

const initialContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        html, body, .iframe-host, .frame-content{
          height: 100%; 
          width: 100%; 
          box-sizing: border-box; 
          padding: 0; 
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="iframe-host"></div>
    </body>
  </html>
`;

const iframeProps = {
  id: "iframe-root",
  head,
  initialContent,
};

const getStyles = ({ appVisibility }) => {
  if (appVisibility) return { height: "400px", width: "600px", border: "none" };
  return { display: "none" };
};

const Iframe = ({ appVisibility, children, skipIframe }) =>
  skipIframe ? (
    children
  ) : (
    <Frame {...iframeProps} style={getStyles({ appVisibility })}>
      {children}
    </Frame>
  );

export default Iframe;
