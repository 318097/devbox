import { Card, Loading } from "@codedrops/react-ui";
import handleError from "../lib/errorHandling";
import React, { useEffect, useState } from "react";
import "../App.scss";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  getDataFromStorage,
  customStorage,
  setDataInStorage,
} from "../lib/storage";
import Header from "./Header";
import Routes from "./Routes";
import tracker from "../lib/mixpanel";
import { setSession, setKey, setAppLoading } from "../redux/actions";
import { INITIAL_STATE } from "../redux/reducer";
import config from "../config";
import Footer from "./Footer";

const AppContent = ({
  setSession,
  setKey,
  setAppLoading,
  activePage,
  session = {},
  appLoading,
  toggleState,
}) => {
  const history = useHistory();
  const [initLoading, setInitLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    save();
  }, [session, activePage]);

  const load = () => {
    getDataFromStorage(async (state) => {
      try {
        /* Rehydrate the store */
        setKey(state);

        const { activePage } = state;
        history.push(`/${activePage}`);
      } catch (error) {
        handleError(error);
      } finally {
        // tracker.track("INIT", { path: state.activePage || "-" });
        setTimeout(() => setInitLoading(false), 500);
      }
    });
  };

  const save = () => {
    // if (initLoading) return;
    // const updatedSession = { ...(session || {}), isAuthenticated: false };
    // const dataToSave = {
    //   session: updatedSession,
    //   activePage,
    // };
    // // console.log("saving:", dataToSave);
    // setDataInStorage(dataToSave);
  };

  return (
    <Card className="app-content" hover={false}>
      <Header />
      <div className="fcc gap-8">
        {config.isExtension && (
          <button className="close-button" onClick={toggleState}>
            Close
          </button>
        )}
      </div>
      <div className="sec">
        {!initLoading && (
          <Routes
            appLoading={appLoading}
            setAppLoading={setAppLoading}
            setSession={setSession}
          />
        )}
        {(initLoading || appLoading) && (
          <Loading type="dot-loader" background="white" />
        )}
      </div>

      <Footer />
    </Card>
  );
};

const mapStateToProps = ({ session = {}, appLoading }) => ({
  session,
  appLoading,
});

const mapDispatchToProps = {
  setAppLoading,
  setSession,
  setKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
