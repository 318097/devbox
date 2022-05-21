import axios from "axios";
import _ from "lodash";
import constants from "./constants";
import handleError from "../lib/errorHandling";
import notify from "../lib/notify";
import tracker from "../lib/mixpanel";

const setAppLoading = (payload) => ({
  type: constants.SET_APP_LOADING,
  payload,
});

const setSession = (payload) => ({
  type: constants.SET_SESSION,
  payload: payload,
});

const setKey = (payload) => ({
  type: constants.SET_KEY,
  payload: payload,
});

const setActivePage = (page) => ({
  type: constants.SET_ACTIVE_PAGE,
  payload: page,
});

const fetchEntityData = () => async (dispatch, getState) => {
  try {
    dispatch(setAppLoading(true));
    const { data } = await axios.get(`/%app_name%`);
    dispatch({ type: constants.FETCH_ENTITY_DATA, payload: data });
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(setAppLoading(false));
  }
};

const addEntity = () => async (dispatch, getState) => {
  const { data } = getState();

  try {
    dispatch(setAppLoading(true));
    const {
      data: { result },
    } = await axios.post("/%app_name%", data);

    dispatch({
      type: constants.ADD_ENTITY,
      payload: result,
    });
    notify("Created");
    tracker.track("ADD_ENTITY");
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
  type: constants.SET_ENTITY_FOR_EDIT,
  payload: update,
});

const deleteEntity = (_id) => async (dispatch, getState) => {
  try {
    dispatch(setAppLoading(true));
    await axios.delete(`/%app_name%/${_id}`);
    dispatch({ type: constants.DELETE_ENTITY, payload: _id });
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
  setSession,
  setKey,
  setAppLoading,
  fetchEntityData,
  clearEntityFormData,
  updateEntityData,
  setActivePage,
  addEntity,
  deleteEntity,
  setEntityForEdit,
  updateEntity,
};
