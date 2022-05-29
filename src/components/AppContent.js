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
import config from "../config";
import Footer from "./Footer";
import "antd/dist/antd.css";

const AppContent = ({
  setSession,
  setKey,
  setAppLoading,
  toggleState,
  entityList,
}) => {
  const history = useHistory();
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    save();
  }, [entityList]);

  const load = () => {
    getDataFromStorage(async (state) => {
      try {
        /* Rehydrate the store */
        setKey(state);

        console.log("reading::-", state);
      } catch (error) {
        handleError(error);
      } finally {
        // tracker.track("INIT", { path: state.activePage || "-" });
        setTimeout(() => setInitLoading(false), 500);
      }
    });
  };

  const save = () => {
    if (initLoading) return;
    console.log("saving:", { entityList });
    setDataInStorage({ entityList });
  };

  return (
    <Card className="app-content" hover={false}>
      <Header toggleState={toggleState} />
      <div className="sec">
        {!initLoading && (
          <Routes setAppLoading={setAppLoading} setSession={setSession} />
        )}
        {initLoading && <Loading type="dot-loader" background="white" />}
      </div>
      <Footer />
    </Card>
  );
};

const mapStateToProps = ({ entityList }) => ({ entityList });

const mapDispatchToProps = {
  setAppLoading,
  setSession,
  setKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
