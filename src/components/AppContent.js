import { Loading } from "@codedrops/react-ui";
import React from "react";
import "../App.scss";
import { connect } from "react-redux";
import Header from "./Header";
import Routes from "./Routes";
import { setSession, setKey, setAppLoading } from "../redux/actions";
import Footer from "./Footer";
import "antd/dist/antd.css";

const AppContent = (props) => {
  const { initLoading } = props;
  return (
    <div className="app-content">
      <Header {...props} />
      <div className="section-container">
        {initLoading ? (
          <Loading type="dot-loader" background="white" />
        ) : (
          <Routes {...props} />
        )}
      </div>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = {
  setAppLoading,
  setSession,
  setKey,
};

export default connect(null, mapDispatchToProps)(AppContent);
