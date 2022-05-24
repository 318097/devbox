import React, { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import "./AddItem.scss";
import tracker from "../../lib/mixpanel";
import { InputWrapper, ButtonWrapper } from "../../lib/UI";
import { useObject } from "@codedrops/lib";
import { addEntity } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import shortid from "shortid";

const sourceOptions = [
  { label: "Local storage", value: "LOCAL_STORAGE" },
  { label: "Session storage", value: "SESSION_STORAGE" },
];

const generateId = () => shortid.generate();

const AddItem = ({ addEntity }) => {
  const history = useHistory();
  const [formData, setFormData, resetFormData] = useObject();

  const addPair = async () => {
    await addEntity({ ...formData, _id: generateId() });
    resetFormData();
    history.push("/");
  };

  const handleOnChange = (e, value, valObj) => setFormData(valObj);

  return (
    <section id="add-item">
      Add item
      <div className="add-item-container">
        <InputWrapper
          placeholder={"Label"}
          value={formData.label}
          name={"label"}
          onChange={handleOnChange}
        />
        <InputWrapper
          placeholder={"Key name"}
          value={formData.keyName}
          name={"keyName"}
          onChange={handleOnChange}
        />
        <InputWrapper
          placeholder={"Path"}
          value={formData.path}
          name={"path"}
          onChange={handleOnChange}
        />
        <ButtonWrapper onClick={addPair}>Add</ButtonWrapper>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { addEntity };
export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
