import React from "react";
import { connect } from "react-redux";
import app from "../appData";
import { IconWrapper } from "../lib/UI";

const Header = ({ toggleState }) => {
  return (
    <header>
      <div className="app-name-container">
        <div className="app-name">{app.appName}</div>
      </div>
      <IconWrapper
        className="close-button"
        onClick={() => toggleState()}
        type="close"
      />
    </header>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
