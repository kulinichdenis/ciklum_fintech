import { createAction, handleActions } from 'redux-actions'
import { startOfMonth } from '../../utils/helpers';
import { 
  FETCH_NEO,
  FETCH_NEO_SUCCESS,
  FETCH_NEO_ERROR,
  UPDATE_NEO,
  sizeOfList
} from '../constants';

/* actions */
export const fetchNeo = createAction(FETCH_NEO);
export const fetchNeoSuccess = createAction(FETCH_NEO_SUCCESS);
export const fetchNeoError = createAction(FETCH_NEO_ERROR);
export const updateNeo = createAction(UPDATE_NEO);

/* reducers */
const initialState = {
  data: [],
  list: [],
  fetching: false,
  startDay: startOfMonth(new Date()),
  error: ''
}

export default handleActions({
  [FETCH_NEO]: (state) => ({ ...state, fetching: true }), 
  [FETCH_NEO_SUCCESS]: (state, { payload }) => {
    const { data, startDay } = payload;
    
    return { ...state, data: [...state.data, ...data ], startDay, fetching: false }
  },
  [FETCH_NEO_ERROR]: (state, { payload }) => {
    return { ...state, error: payload, fetching: false };
  },
  [UPDATE_NEO]: (state) => {  
    let list, data;
    const element = state.data[0];

    if (state.list.length === sizeOfList) {
      list = element ? [...state.list.slice(1), element] : [...state.list];
      data = state.data.slice(1);
    } else {
      const delta = sizeOfList - state.list.length;
      list = [...state.list, ...state.data.slice(0, delta)];
      data = state.data.slice(delta);
    }

    return { ...state, list, data };
  },
}, initialState)
