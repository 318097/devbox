import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { setActivePage, setKey } from "../redux/actions";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import app from "../appData";

const Header = ({
  isAuthenticated,
  activePage,
  setKey,
  logout,
  setActivePage,
}) => {
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname.slice(1));
  }, [location.pathname]);

  return (
    <header>
      <div className="app-name-container">
        <div className="app-name">{app.appName}</div>
      </div>
      <Navigation isAuthenticated={isAuthenticated} />
    </header>
  );
};

const mapStateToProps = ({ activePage, pendingTasksOnly, session }) => ({
  activePage,
  isAuthenticated: session?.isAuthenticated,
});

const mapDispatchToProps = {
  setActivePage,
  setKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
