import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import config from "./config";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider, connect } from "react-redux";
import Iframe from "./lib/wrapWithIFrame";
import { setDataInStorage, getDataFromStorage } from "./lib/storage";
import { setKey } from "./redux/actions";
import handleError from "./lib/errorHandling";
import Logo from "./assets/icons/logo.svg";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

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

const App = ({ entityList, setKey }) => {
  const [appVisibility, setAppVisibility] = useState();
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    save({ appVisibility, entityList });
  }, [appVisibility, entityList]);

  const save = (data) => {
    if (initLoading) return;

    getDataFromStorage((prevState) => {
      const updatedState = { ...prevState, ...data };
      // console.log("saving:", updatedState);
      setDataInStorage(updatedState);
    });
  };

  const load = () => {
    getDataFromStorage(async (state) => {
      try {
        /* Rehydrate the store */
        setKey(state);
        // console.log("reading::-", state);
        toggleState(state.appVisibility);
      } catch (error) {
        handleError(error);
      } finally {
        // tracker.track("INIT", { path: state.activePage || "-" });
        setTimeout(() => setInitLoading(false), 500);
      }
    });
  };

  const toggleState = (value) =>
    setAppVisibility((prev) => (typeof value === "boolean" ? value : !prev));

  return (
    <Iframe appVisibility={appVisibility}>
      <div className="react-ui">
        {appVisibility ? (
          <div className="application-container">
            <Layout toggleState={toggleState} initLoading={initLoading} />
          </div>
        ) : (
          <span className="logo" onClick={() => toggleState()}>
            <Logo />
          </span>
        )}
      </div>
    </Iframe>
  );
};

const mapStateToProps = ({ entityList }) => ({ entityList });

const mapDispatchToProps = {
  setKey,
};

const AppWr = connect(mapStateToProps, mapDispatchToProps)(App);

const Router = config.isApp ? BrowserRouter : MemoryRouter;

const AppWrapper = () => (
  <Provider store={store}>
    <Router>
      {/* <Sentry.ErrorBoundary fallback={"An error has occurred"}> */}
      <AppWr />
      {/* </Sentry.ErrorBoundary> */}
    </Router>
  </Provider>
);

export default AppWrapper;
