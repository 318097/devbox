import constants from "./constants";
import handleError from "../lib/errorHandling";
import notify from "../lib/notify";
import tracker from "../lib/mixpanel";

const setAppLoading = (payload) => ({
  type: constants.SET_APP_LOADING,
  payload,
});

const setKey = (payload) => ({
  type: constants.SET_KEY,
  payload: payload,
});

const addEntity = () => async (dispatch) => {
  try {
    dispatch(setAppLoading(true));
    await dispatch({
      type: constants.ADD_ENTITY,
    });
    notify("Created");
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(setAppLoading(false));
  }
};

const setEntityForEdit = (_id) => ({
  type: constants.SET_ENTITY_FOR_EDIT,
  payload: _id,
});

const updateEntity = (update) => ({
  type: constants.UPDATE_ENTITY,
  payload: update,
});

const deleteEntity = (_id) => async (dispatch) => {
  try {
    dispatch(setAppLoading(true));
    await dispatch({ type: constants.DELETE_ENTITY, payload: _id });
    notify(`Deleted`);
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(setAppLoading(false));
  }
};

const updateEntityData = (update) => ({
  type: constants.UPDATE_ENTITY_FORM_DATA,
  payload: update,
});

const clearEntityFormData = () => ({
  type: constants.CLEAR_ENTITY_FORM_DATA,
});

export {
  setKey,
  setAppLoading,
  clearEntityFormData,
  updateEntityData,
  addEntity,
  deleteEntity,
  setEntityForEdit,
  updateEntity,
};
