import React from "react";
import { connect } from "react-redux";
import app from "../appData";
import { IconWrapper } from "../lib/UI";
import { useHistory } from "react-router-dom";

const Header = ({ toggleState }) => {
  const history = useHistory();

  return (
    <header>
      <div className="app-name-container">
        <div className="app-name" onClick={() => history.push("/home")}>
          {app.appName}
        </div>
      </div>
      <div className="flex gap-2">
        <IconWrapper
          className="close-button"
          onClick={() => history.push("/about")}
          type="star"
        />
        <IconWrapper
          className="close-button"
          onClick={() => toggleState()}
          type="close"
        />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
