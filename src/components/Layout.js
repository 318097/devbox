import React from "react";
import "../App.scss";
import { connect } from "react-redux";
import Header from "./Header";
import Routes from "./Routes";
import { setKey, setAppLoading } from "../redux/actions";
import "antd/dist/antd.css";

const Layout = (props) => {
  const { initLoading } = props;
  return (
    <div className="app-content">
      <Header {...props} />
      <div className="section-container">
        {initLoading ? (
          <div className="pl-8">Loading..</div>
        ) : (
          <Routes {...props} />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setAppLoading,
  setKey,
};

export default connect(null, mapDispatchToProps)(Layout);
