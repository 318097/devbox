import { message } from "antd";

message.config({
  getContainer: () => {
    const iframe = document.querySelector("#extension-root iframe#iframe-root");
    return iframe?.contentWindow.document.body.querySelector(".react-ui");
  },
});

const notify = (msg, type = "success") => {
  message.info(msg);
};

export default notify;
