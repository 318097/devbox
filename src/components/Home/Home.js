import React, { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Home.scss";
import tracker from "../../lib/mixpanel";

const Home = ({ data = [] }) => {
  return (
    <section id="home">
      <div className="list-container">
        {data.length ? (
          <>{data.map((item) => {})}</>
        ) : (
          <div className="empty-message">Empty</div>
        )}
      </div>
    </section>
  );
};

// const mapStateToProps = (state) => {};
// const mapDispatchToProps = {};
// export default connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
