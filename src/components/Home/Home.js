import React, { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Home.scss";
import tracker from "../../lib/mixpanel";
import {
  IconWrapper,
  EmptyWrapper,
  MenuWrapper,
  TagWrapper,
} from "../../lib/UI";
import { useHistory } from "react-router-dom";
import { copyToClipboard } from "@codedrops/lib";
import notify from "../../lib/notify";
import { setEntityForEdit, deleteEntity } from "../../redux/actions";

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

const Home = ({ entityList = [], setEntityForEdit, deleteEntity }) => {
  const history = useHistory();

  const handleAction = (action, _id) => {
    switch (action) {
      case "edit":
        setEntityForEdit(_id);
        history.push("/add-item");
        break;
      case "delete":
        deleteEntity(_id);
        break;
    }
  };

  return (
    <section id="home">
      {entityList.length ? (
        <div className="list-container">
          {entityList.map((entity) => (
            <EntityItem
              key={entity._id}
              entity={entity}
              handleAction={handleAction}
            />
          ))}
        </div>
      ) : (
        <EmptyWrapper />
      )}
      <IconWrapper
        onClick={() => history.push("/add-item")}
        type={"plus"}
        className="add-icon"
      />
    </section>
  );
};

const EntityItem = ({ entity, handleAction }) => {
  const { label, keyName, path, _id } = entity;

  const value = parseValue({ keyName, path });
  const parsedLabel = value === "UNDEFINED_KEY" ? value : label;
  const parsedValue = value === "UNDEFINED_KEY" ? "-" : value;

  const copy = () => {
    copyToClipboard(parsedValue);
    notify("Copied.");
  };

  return (
    <div className="entity-item">
      <div className="entity-section-wrapper">
        <div className="entity-label">{parsedLabel}</div>
        <div className="entity-path">{`'${keyName}.${path}'`}</div>
      </div>
      <TagWrapper className="entity-value" onClick={copy}>
        {parsedValue}
      </TagWrapper>

      <MenuWrapper
        onChange={(action) => handleAction(action, _id)}
        options={[
          { label: "Edit", value: "edit" },
          { label: "Delete", value: "delete" },
        ]}
      />
    </div>
  );
};

const mapStateToProps = ({ entityList }) => ({
  entityList,
});
const mapDispatchToProps = { setEntityForEdit, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
