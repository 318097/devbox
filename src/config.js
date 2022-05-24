import { getServerURL } from "@codedrops/lib";
import app from "./appData";

console.log("CONFIG:", __TYPE__, __ENV__);

const { MIXPANEL_TRACKING_ID, SENTRY_URL, MIXPANEL_TRACKING_ID_STAGING } =
  process.env;

const isProd = __ENV__ === "production";

const config = {
  SERVER_URL: getServerURL({ isProd }),
  IS_LOCAL_STORAGE: __TYPE__ === "app",
  DEFAULT_EXT_VISIBILITY_STATE:
    __TYPE__ === "app" || (__TYPE__ === "ext" && __ENV__ === "development"),
  isExtension: __TYPE__ === "ext",
  isApp: __TYPE__ === "app",
  NODE_ENV: __ENV__,
  STATE_KEY: app.appName,
  SENTRY_URL,
  // SENTRY_RELEASE,
  MIXPANEL_TRACKING_ID: isProd
    ? MIXPANEL_TRACKING_ID
    : MIXPANEL_TRACKING_ID_STAGING,
};

export default config;
