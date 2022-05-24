import React, { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Home.scss";
import tracker from "../../lib/mixpanel";

const Home = ({ data = [] }) => {
  return (
    <section id="home">
      {data.length ? (
        <div className="list-container">
          {data.map((item) => (
            <DataItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-message">Empty</div>
      )}
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

// const mapStateToProps = (state) => {};
// const mapDispatchToProps = {};
// export default connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
