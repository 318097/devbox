import React, { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Home.scss";
import tracker from "../../lib/mixpanel";
import { ButtonWrapper } from "../../lib/UI";
import { useHistory } from "react-router-dom";

const Home = ({ entityList = [] }) => {
  const history = useHistory();

  return (
    <section id="home">
      {entityList.length ? (
        <div className="list-container">
          {entityList.map((item) => (
            <DataItem key={item._id} item={item} />
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

const DataItem = ({ item }) => {
  const { label, value } = item;

  return (
    <div className="data-item">
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
};

const mapStateToProps = ({ entityList }) => ({
  entityList,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
