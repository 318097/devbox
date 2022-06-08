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
import tracker from "./lib/mixpanel";
import { generateLead } from "./lib/helpers";

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

const App = ({ entityList, setKey, user }) => {
  const [appVisibility, setAppVisibility] = useState();
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    save({ appVisibility, entityList, user });
  }, [appVisibility, entityList, user]);

  const save = (data) => {
    // if (initLoading) return;

    getDataFromStorage((prevState) => {
      const updatedState = { ...prevState, ...data };
      // console.log("saving:", updatedState);
      setDataInStorage(updatedState);
    });
  };

  const loadUser = ({ user } = {}) => {
    if (!user) {
      user = generateLead();

      tracker.setIdentity(user, "id");
      tracker.setUser(user);
    }

    return user;
  };

  const load = () => {
    getDataFromStorage(async (state) => {
      try {
        // console.log("reading::-", state);
        const user = loadUser(state);
        /* Rehydrate the store */
        const updatedState = { ...state, user };

        setKey(updatedState);
        toggleState(state.appVisibility);

        //  tracker.track("INIT", { path: state.activePage || "-" });
      } catch (error) {
        handleError(error);
      } finally {
        setTimeout(() => setInitLoading(false), 500);
      }
    });
  };

  const toggleState = (value) =>
    setAppVisibility((prev) => {
      const newValue = typeof value === "boolean" ? value : !prev;
      return newValue;
    });

  return (
    <Iframe appVisibility={appVisibility}>
      <div className="react-ui">
        {appVisibility ? (
          <div className="application-container">
            <Layout toggleState={toggleState} initLoading={initLoading} />
          </div>
        ) : (
          <span
            className="logo"
            onClick={() => {
              toggleState();
              tracker.track("ACTION", {
                command: "open",
                type: "App visibility",
              });
            }}
          >
            <Logo />
          </span>
        )}
      </div>
    </Iframe>
  );
};

const mapStateToProps = ({ entityList, user }) => ({ entityList, user });

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
