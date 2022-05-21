import { EventTracker } from "@codedrops/lib";
import config from "../config";

const events = {
  INIT: { name: "Init", fields: ["path"] },
  ACTION: { name: "Action", fields: ["command", "type"] },
  REGISTER: { name: "Register" },
  LOGIN: { name: "Login" },
  LOGOUT: { name: "Logout" },
  NAVIGATION: { name: "Navigation", fields: ["name"] },
  OTHER_PRODUCTS: { name: "Other products", fields: ["name"] },
  SUPPORT: { name: "Support", fields: ["type"] },
  // CLICKED_SOCIAL_ICON: {
  //   name: "Clicked social icon",
  //   fields: ["platform"],
  // },
  // SUBMITTED_FEEDBACK: { name: "Submitted feedback" },
};

const tracker = new EventTracker(
  {
    events,
    trackingId: config.MIXPANEL_TRACKING_ID,
    isDev: !config.IS_PROD,
  },
  {
    defaultProperties: { appSource: __TYPE__ },
  }
);

export default tracker;
