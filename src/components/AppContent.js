import { Card, Loading } from "@codedrops/react-ui";
import _ from "lodash";
import handleError from "../lib/errorHandling";
import axios from "axios";
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
import {
  setSession,
  setKey,
  setAppLoading,
  fetchEntityData,
} from "../redux/actions";
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
  fetchEntityData,
  toggleState,
}) => {
  const history = useHistory();
  const [initLoading, setInitLoading] = useState(false);
  const { isAuthenticated } = session;

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    save();
  }, [session, activePage]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchEntityData();
  }, [isAuthenticated]);

  const isAccountActive = async (token) => {
    // try {
    //   axios.defaults.headers.common["authorization"] = token;
    //   const { data } = await axios.post(`/auth/account-status`);
    //   setSession({ ...data, isAuthenticated: true, token });
    // } catch (error) {
    //   handleError(error, { logout });
    // }
  };

  const logout = () => {
    // setKey(INITIAL_STATE);
    // setAppLoading(false);
    // setInitLoading(false);
    // console.log("%c LOGOUT", "color: red;");
    // tracker.track("LOGOUT");
    // tracker.reset();
    // history.push("/login");
  };

  const load = () => {
    // getDataFromStorage(async (state) => {
    //   try {
    //     setKey(state);
    //     const { activePage, session } = state;
    //     const token = _.get(session, "token");
    //     if (!token) {
    //       // history.push("/login");
    //       setInitLoading(false);
    //       return;
    //     }
    //     history.push(`/${activePage}`);
    //     await isAccountActive(token);
    //   } catch (error) {
    //     handleError(error);
    //   } finally {
    //     tracker.track("INIT", { path: state.activePage || "-" });
    //     setTimeout(() => setInitLoading(false), 500);
    //   }
    // });
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
      <Header logout={logout} />
      <div className="fcc gap-8">
        {config.isExtension && <button onClick={toggleState}>Close</button>}
      </div>
      <div className="sec">
        {!initLoading && (
          <Routes
            logout={logout}
            appLoading={appLoading}
            setAppLoading={setAppLoading}
            setSession={setSession}
          />
        )}
        {(initLoading || appLoading) && (
          <Loading type="dot-loader" background="white" />
        )}
      </div>

      <Footer isAuthenticated={isAuthenticated} history={history} />
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
  fetchEntityData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
