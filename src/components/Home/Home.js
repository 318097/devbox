import React from "react";
import { connect } from "react-redux";
import "./Home.scss";
import tracker from "../../lib/mixpanel";
import { IconWrapper, EmptyWrapper } from "../../lib/UI";
import { useHistory } from "react-router-dom";
import { setEntityForEdit, deleteEntity } from "../../redux/actions";
import EntityItem from "../EntityItem";

const Home = ({ entityList = [], setEntityForEdit, deleteEntity }) => {
  const history = useHistory();

  const handleAction = (action, _id) => {
    tracker.track("ACTION", { command: action, type: "Entity item" });
    switch (action) {
      case "edit":
        setEntityForEdit(_id);
        history.push("/add-entity");
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
        onClick={() => {
          history.push("/add-entity");
          tracker.track("NAVIGATION", { name: "add entity" });
        }}
        type={"plus"}
        className="add-icon"
      />
    </section>
  );
};

const mapStateToProps = ({ entityList }) => ({
  entityList,
});
const mapDispatchToProps = { setEntityForEdit, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
