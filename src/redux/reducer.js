import _ from "lodash";
import constants from "./constants";
import { getRandomColor, generateId, generateTime } from "../lib/helpers";

const INITIAL_ENTITY_FORM_DATA = {};

const INITIAL_STATE = {
  appLoading: false,
  selectedEntity: null,
  entityFormData: INITIAL_ENTITY_FORM_DATA,
  entityFormMode: "ADD",
  entityList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case constants.SET_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload,
      };

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

    case constants.ADD_ENTITY: {
      const { entityList = [], entityFormData } = state;
      const newObj = {
        ...entityFormData,
        _id: generateId(),
        createdAt: generateTime(),
        sourceType: "LOCAL_STORAGE",
        color: getRandomColor(),
      };
      return {
        ...state,
        entityList: [...entityList, newObj],
        entityFormData: INITIAL_ENTITY_FORM_DATA,
        entityFormMode: "ADD",
      };
    }

    case constants.SET_ENTITY_FOR_EDIT: {
      const { entityList } = state;
      const _id = action.payload;

      const selectedEntity = _.find(entityList, { _id });

      return {
        ...state,
        selectedEntity,
        entityFormData: _.pick(selectedEntity, ["label", "keyName", "path"]),
        entityFormMode: "EDIT",
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
        entityFormMode: "ADD",
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
        entityFormMode: "ADD",
      };

    default:
      return state;
  }
};

export { INITIAL_STATE };

export default reducer;
