import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRecommendation, defaultValue } from 'app/shared/model/recommendation.model';

export const ACTION_TYPES = {
  FETCH_RECOMMENDATION_LIST: 'recommendation/FETCH_RECOMMENDATION_LIST',
  FETCH_RECOMMENDATION: 'recommendation/FETCH_RECOMMENDATION',
  CREATE_RECOMMENDATION: 'recommendation/CREATE_RECOMMENDATION',
  UPDATE_RECOMMENDATION: 'recommendation/UPDATE_RECOMMENDATION',
  PARTIAL_UPDATE_RECOMMENDATION: 'recommendation/PARTIAL_UPDATE_RECOMMENDATION',
  DELETE_RECOMMENDATION: 'recommendation/DELETE_RECOMMENDATION',
  RESET: 'recommendation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecommendation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type RecommendationState = Readonly<typeof initialState>;

// Reducer

export default (state: RecommendationState = initialState, action): RecommendationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RECOMMENDATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECOMMENDATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RECOMMENDATION):
    case REQUEST(ACTION_TYPES.UPDATE_RECOMMENDATION):
    case REQUEST(ACTION_TYPES.DELETE_RECOMMENDATION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_RECOMMENDATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RECOMMENDATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECOMMENDATION):
    case FAILURE(ACTION_TYPES.CREATE_RECOMMENDATION):
    case FAILURE(ACTION_TYPES.UPDATE_RECOMMENDATION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_RECOMMENDATION):
    case FAILURE(ACTION_TYPES.DELETE_RECOMMENDATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECOMMENDATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECOMMENDATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECOMMENDATION):
    case SUCCESS(ACTION_TYPES.UPDATE_RECOMMENDATION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_RECOMMENDATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECOMMENDATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/recommendations';

// Actions

export const getEntities: ICrudGetAllAction<IRecommendation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RECOMMENDATION_LIST,
  payload: axios.get<IRecommendation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IRecommendation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECOMMENDATION,
    payload: axios.get<IRecommendation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IRecommendation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECOMMENDATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRecommendation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECOMMENDATION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IRecommendation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_RECOMMENDATION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecommendation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECOMMENDATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
