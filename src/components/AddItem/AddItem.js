import React, { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import "./AddItem.scss";
import tracker from "../../lib/mixpanel";

const sourceOptions = [
  { label: "Local storage", value: "LOCAL_STORAGE" },
  { label: "Session storage", value: "SESSION_STORAGE" },
];

// source, object, path, label

const AddItem = ({ data = [] }) => {
  return (
    <section id="add-item">
      <div className="add-item-container"></div>
    </section>
  );
};

// const mapStateToProps = (state) => {};
// const mapDispatchToProps = {};
// export default connect(mapStateToProps, mapDispatchToProps)(AddItem);

export default AddItem;
