import _ from "lodash";
import constants from "./constants";

const INITIAL_ENTITY_FORM_DATA = {};

const INITIAL_STATE = {
  appLoading: false,
  selectedEntity: null,
  entityFormData: INITIAL_ENTITY_FORM_DATA,
  activePage: null,
  session: {},
  entityList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case constants.SET_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload,
      };

    case constants.SET_SESSION: {
      const updatedSession = { ...state.session, ...action.payload };
      return {
        ...state,
        session: updatedSession,
      };
    }

    case constants.SET_KEY:
      return {
        ...state,
        ...action.payload,
      };

    case constants.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };

    case constants.FETCH_ENTITY_DATA:
      return {
        ...state,
        entityList: action.payload,
      };

    case constants.ADD_ENTITY: {
      const { entityList = [] } = state;
      return {
        ...state,
        entityList: [...entityList, action.payload],
        entityFormData: INITIAL_ENTITY_FORM_DATA,
      };
    }

    case constants.SET_ENTITY_FOR_EDIT: {
      const { entityList } = state;
      const { _id } = action.payload;

      const selectedEntity = _.find(entityList, { _id });

      return {
        ...state,
        selectedEntity,
      };
    }

    case constants.UPDATE_ENTITY: {
      const { entityList } = state;
      const { payload } = action;
      const updatedEntityList = _.map(entityList, (entity) =>
        entity._id === payload._id ? { ...entity, ...payload } : entity
      );
      return {
        ...state,
        entityList: updatedEntityList,
        selectedEntity: null,
        entityFormData: INITIAL_ENTITY_FORM_DATA,
      };
    }

    case constants.DELETE_ENTITY: {
      const { entityList } = state;
      return {
        ...state,
        selectedEntity: null,
        entityList: _.filter(
          entityList,
          (entity) => entity._id !== action.payload
        ),
      };
    }

    case constants.UPDATE_ENTITY_FORM_DATA:
      return {
        ...state,
        entityFormData: { ...state.entityFormData, ...action.payload },
      };

    case constants.CLEAR_ENTITY_FORM_DATA:
      return {
        ...state,
        entityFormData: INITIAL_ENTITY_FORM_DATA,
      };

    default:
      return state;
  }
};

export { INITIAL_STATE };

export default reducer;
