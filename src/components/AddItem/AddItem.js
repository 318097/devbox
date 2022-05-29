import React from "react";
import { connect } from "react-redux";
import "./AddItem.scss";
import { InputWrapper, ButtonWrapper } from "../../lib/UI";
import {
  addEntity,
  updateEntityData,
  clearEntityFormData,
  updateEntity,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";

// const sourceOptions = [
//   { label: "Local storage", value: "LOCAL_STORAGE" },
//   { label: "Session storage", value: "SESSION_STORAGE" },
// ];

const AddItem = ({
  addEntity,
  entityFormData,
  updateEntityData,
  entityFormMode,
  updateEntity,
  selectedEntity,
}) => {
  const history = useHistory();

  const addPair = async () => {
    if (entityFormMode === "EDIT")
      await updateEntity({ ...selectedEntity, ...entityFormData });
    else await addEntity();
    history.push("/");
  };

  const goBack = () => history.push("/");

  const handleOnChange = (e, value, valObj) => updateEntityData(valObj);

  return (
    <section id="add-item">
      <h3>{`${entityFormMode === "EDIT" ? "Edit" : "Add"} entry`}</h3>
      <div className="add-item-container flex column gap-4">
        <InputWrapper
          placeholder={"Label"}
          value={entityFormData.label}
          name={"label"}
          onChange={handleOnChange}
        />
        <div className="flex gap-4">
          <InputWrapper
            placeholder={"Key name"}
            value={entityFormData.keyName}
            name={"keyName"}
            onChange={handleOnChange}
          />
          <InputWrapper
            placeholder={"Path"}
            value={entityFormData.path}
            name={"path"}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex gap-4">
          <ButtonWrapper onClick={goBack}>Cancel</ButtonWrapper>
          <ButtonWrapper onClick={addPair} type="primary">{`${
            entityFormMode === "EDIT" ? "Update" : "Add"
          }`}</ButtonWrapper>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({
  entityFormData,
  entityFormMode,
  selectedEntity,
}) => ({
  entityFormData,
  entityFormMode,
  selectedEntity,
});

const mapDispatchToProps = {
  addEntity,
  updateEntityData,
  clearEntityFormData,
  updateEntity,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
