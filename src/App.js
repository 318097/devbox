import React, { useState, Fragment } from "react";
import "./App.scss";
// import axios from "axios";
import AppContent from "./components/AppContent";
import classnames from "classnames";
import config from "./config";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

// axios.defaults.baseURL = config.SERVER_URL;
// axios.defaults.headers.common["external-source"] = %app_id%";

// Sentry.init({
//   environment: config.NODE_ENV,
//   dsn: config.SENTRY_URL,
//   integrations: [new Integrations.BrowserTracing()],
//   // release: config.SENTRY_RELEASE,
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

const Router = config.isApp ? BrowserRouter : MemoryRouter;

const AppWrapper = () => (
  <Provider store={store}>
    <Router>
      {/* <Sentry.ErrorBoundary fallback={"An error has occurred"}> */}
      <App />
      {/* </Sentry.ErrorBoundary> */}
    </Router>
  </Provider>
);

const App = () => {
  const [appVisibility, setAppVisibility] = useState(config.DEFAULT_STATE);

  const toggleState = () => setAppVisibility((prev) => !prev);

  const applicationContainerClasses = classnames("application-container", {
    extension: config.isExtension,
    application: config.isApp,
  });

  return (
    <div className="react-ui">
      {config.isApp ? (
        <div className={applicationContainerClasses}>
          <AppContent />
        </div>
      ) : (
        <Fragment>
          {appVisibility ? (
            <div className={applicationContainerClasses}>
              <AppContent toggleState={toggleState} />
            </div>
          ) : (
            <span className="dot" onClick={toggleState}></span>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default AppWrapper;
