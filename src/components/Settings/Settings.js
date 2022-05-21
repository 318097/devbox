import React, { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Settings.scss";
import tracker from "../../lib/mixpanel";

const Settings = ({ data }) => {
  return <section id="settings"></section>;
};

const mapStateToProps = (state) => {};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
