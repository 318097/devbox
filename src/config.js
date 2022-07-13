import app from "./appData";

console.log(`[Devbox]: Running '${__TYPE__}' in '${__ENV__}' mode.`);

const { MIXPANEL_TRACKING_ID, SENTRY_URL, MIXPANEL_TRACKING_ID_STAGING } =
  process.env;

const IS_PROD = __ENV__ === "production";

const config = {
  IS_LOCAL_STORAGE: __TYPE__ === "app",
  DEFAULT_EXT_VISIBILITY_STATE:
    __TYPE__ === "app" || (__TYPE__ === "ext" && __ENV__ === "development"),
  isExtension: __TYPE__ === "ext",
  isApp: __TYPE__ === "app",
  NODE_ENV: __ENV__,
  STATE_KEY: app.appName,
  SENTRY_URL,
  IS_PROD,
  // SENTRY_RELEASE,
  MIXPANEL_TRACKING_ID: IS_PROD
    ? MIXPANEL_TRACKING_ID
    : MIXPANEL_TRACKING_ID_STAGING,
};

export default config;
