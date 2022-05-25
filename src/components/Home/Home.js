import React, { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Home.scss";
import tracker from "../../lib/mixpanel";
import { ButtonWrapper } from "../../lib/UI";
import { useHistory } from "react-router-dom";

const parseJSON = ({ keyValue }) => {
  try {
    const value = JSON.parse(keyValue);
    return { value, type: "JSON" };
  } catch (e) {
    return { value: keyValue, type: "STRING" };
  }
};

const parseValue = ({ keyName, path }) => {
  const keyValue = localStorage.getItem(keyName);

  if (!keyValue) return "UNDEFINED_KEY";

  const { value, type } = parseJSON({ keyValue });

  return (type === "JSON" ? _.get(value, path) : value) || "UNDEFINED_VALUE";
};

const Home = ({ entityList = [] }) => {
  const history = useHistory();

  return (
    <section id="home">
      {entityList.length ? (
        <div className="list-container">
          {entityList.map((entity) => (
            <EntityItem key={entity._id} entity={entity} />
          ))}
        </div>
      ) : (
        <div className="empty-message">Empty</div>
      )}
      <ButtonWrapper onClick={() => history.push("/add-item")}>
        Add new
      </ButtonWrapper>
    </section>
  );
};

const EntityItem = ({ entity }) => {
  const { label, keyName, path } = entity;

  const value = parseValue({ keyName, path });
  const parsedLabel = value === "UNDEFINED_KEY" ? value : label;
  const parsedValue = value === "UNDEFINED_KEY" ? "-" : value;

  return (
    <div className="entity-item">
      <div className="entity-label">{parsedLabel}</div>
      <div className="entity-value">{parsedValue}</div>
    </div>
  );
};

const mapStateToProps = ({ entityList }) => ({
  entityList,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
