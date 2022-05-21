import React, { useState, useEffect } from "react";
import { copyToClipboard, getAndFormatProducts } from "@codedrops/lib";
import notify from "../../lib/notify";
import { connect } from "react-redux";
import _ from "lodash";
import "./About.scss";
import { setAppLoading } from "../../redux/actions";
import handleError from "../../lib/errorHandling";
import tracker from "../../lib/mixpanel";

const About = ({ appId, setAppLoading }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    downloadProductInfo();
  }, []);

  const downloadProductInfo = async () => {
    if (!_.isEmpty(products)) return;

    try {
      setAppLoading(true);
      const { others } = await getAndFormatProducts({
        appId,
        trackingInfo: { utm_medium: "about" },
      });
      setProducts(others);
    } catch (error) {
      handleError(error);
    } finally {
      setAppLoading(false);
    }
  };

  const copy = (input) => {
    copyToClipboard(input);
    notify("Copied!");
  };

  return (
    <section id="about">
      {/* <div className="block">
        <div className="header-row">
          <h3>Story</h3>
        </div>
        <div className="wrapper">
        
        </div>
      </div> */}

      <div className="block">
        <div className="header-row">
          <h3>Contact</h3>
        </div>
        <div className="wrapper">
          Reach out to me at{" "}
          <span
            className="link"
            onClick={() => copy("mehullakhanpal@gmail.com")}
          >
            mehullakhanpal@gmail.com
          </span>{" "}
          for any feedback/queries. <br />I am planning out v2 for this app.
          Ping me if interested in collaborating.
        </div>
      </div>

      <div className="block">
        <div className="header-row">
          <h3>Donate/Sponser</h3>
        </div>
        <div className="wrapper">
          If you like this app consider supporting{" "}
          <a
            href="https://www.buymeacoffee.com/mehullakhanpal"
            target="__blank"
            className="link"
            onClick={() =>
              tracker.track("SUPPORT", { type: "Buy me a coffee" })
            }
          >
            here
          </a>
        </div>
      </div>

      <div className="block">
        <div className="header-row">
          <h3>Other products</h3>
        </div>
        <div className="products-list">
          {products.map(({ id, name, tagline, ctaUrl }) => (
            <a
              rel="noreferrer"
              key={id}
              className="product-item"
              href={ctaUrl}
              target="_blank"
              onClick={() => tracker.track("OTHER_PRODUCTS", { name })}
            >
              <div className="product-title">{name}</div>
              <div className="product-description">{tagline}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = {
  setAppLoading,
};

export default connect(null, mapDispatchToProps)(About);
