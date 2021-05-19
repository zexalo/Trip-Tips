import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInfoUser, defaultValue } from 'app/shared/model/info-user.model';

export const ACTION_TYPES = {
  FETCH_INFOUSER_LIST: 'infoUser/FETCH_INFOUSER_LIST',
  FETCH_INFOUSER: 'infoUser/FETCH_INFOUSER',
  CREATE_INFOUSER: 'infoUser/CREATE_INFOUSER',
  UPDATE_INFOUSER: 'infoUser/UPDATE_INFOUSER',
  PARTIAL_UPDATE_INFOUSER: 'infoUser/PARTIAL_UPDATE_INFOUSER',
  DELETE_INFOUSER: 'infoUser/DELETE_INFOUSER',
  RESET: 'infoUser/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInfoUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type InfoUserState = Readonly<typeof initialState>;

// Reducer

export default (state: InfoUserState = initialState, action): InfoUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INFOUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INFOUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_INFOUSER):
    case REQUEST(ACTION_TYPES.UPDATE_INFOUSER):
    case REQUEST(ACTION_TYPES.DELETE_INFOUSER):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_INFOUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_INFOUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INFOUSER):
    case FAILURE(ACTION_TYPES.CREATE_INFOUSER):
    case FAILURE(ACTION_TYPES.UPDATE_INFOUSER):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_INFOUSER):
    case FAILURE(ACTION_TYPES.DELETE_INFOUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INFOUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INFOUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_INFOUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_INFOUSER):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_INFOUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_INFOUSER):
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

const apiUrl = 'api/info-users';

// Actions

export const getEntities: ICrudGetAllAction<IInfoUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INFOUSER_LIST,
  payload: axios.get<IInfoUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IInfoUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INFOUSER,
    payload: axios.get<IInfoUser>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IInfoUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INFOUSER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInfoUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INFOUSER,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IInfoUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_INFOUSER,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInfoUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INFOUSER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
