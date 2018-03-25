import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import { delay } from 'redux-saga';
import { call, put, takeEvery, select, fork } from 'redux-saga/effects';

import {
  FETCH_NEO,
  UPDATE_NEO,
  throughDays,
  baseField,
  maxListElements
} from 'state/constants';

import {
  fetchNeoSuccess,
  fetchNeoError,
  fetchingNeoStop,
  selList,
  updateNeo,
  fetchNeo
} from '../reducers/Neo';

import { fetchData } from '../../utils/apiClient';

import { 
  dateToString,
  startOfMonth,
  getValuesObj,
  upDay,
  computed,
  prepareObjects
} from '../../utils/helpers';

// selectors
const sizeOfList = state => state.neo.list.length;
const fetching = state => state.neo.fetching;
const sizeOfData = state => state.neo.data.length;
const startDay = state => state.neo.startDay; 

function* fetch() { 
  const today = new Date();
  let steps = 0;
  while(steps < 5) {
    try {
      let firstDay = yield select(startDay);
      firstDay = firstDay.getTime() >= today.getTime() ? startOfMonth(today) : firstDay;
      
      const updateDay = upDay(firstDay, throughDays);
      const endDay = updateDay.getTime() >= today.getTime() ? today : updateDay;
      
      let { data } = yield call(fetchData, dateToString(firstDay), dateToString(endDay));
      
      const nearObjects = prepareObjects(get(data, baseField, {}));

      yield put(fetchNeoSuccess({ data: sortBy(nearObjects, item => item.date), startDay: upDay(endDay, 1) }));
    } catch(error) {
      yield put(fetchNeoError('Problem with fetch data'))
    }
    steps++;
  }
}

function* updateList() {
  const statusFetch = yield select(fetching);
  const size = yield select(sizeOfData);

  if (!statusFetch && size < maxListElements) {
      yield put(fetchNeo());
  }
}

function* requesting() {
  yield fork(fetch);
}

function* watchSaga() {
  yield takeEvery(FETCH_NEO, requesting)
  yield takeEvery(UPDATE_NEO, updateList)
}

export default watchSaga;