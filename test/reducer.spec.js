import { neo } from '../src/state/reducers'
import { startOfMonth } from '../src/utils/helpers';
import { UPDATE_NEO, FETCH_NEO, FETCH_NEO_ERROR, FETCH_NEO_SUCCESS } from '../src/state/constants';

const defaultState = {
  data: [],
  list: [],
  fetching: false,
  error: '',
  startDay: startOfMonth(new Date())
}

const data = [
  { value: 1 }, { value: 2 }, { value: 3 },
  { value: 4 }, { value: 5 }, { value: 6 },
  { value: 7 },
];

describe('test reducer', () => {
  it('should return initial state', () => {
    expect(neo(undefined, {})).toEqual(defaultState)
  });
  
  it('should handle FETCH_NEO_SUCCESS', () => {  
    const startDay = new Date();
    expect(neo(defaultState, { type: FETCH_NEO_SUCCESS, payload: { data, startDay } }))
      .toEqual({ ...defaultState, data, startDay })
  });

  it('should handle UPDATE NEO with empty state', () => {
    expect(neo(defaultState, { type: UPDATE_NEO })).toEqual(defaultState)
  });
  
  it('should handle UPDATE NEO with list of NEO has less than 6 items', () => {
    expect(neo({ ...defaultState, data }, { type: UPDATE_NEO }))
      .toEqual({
        ...defaultState, data: [{ value: 7 }],
        list: [
          { value: 1 }, { value: 2 }, { value: 3 },
          { value: 4 }, { value: 5 }, { value: 6 }
        ]
      })
  });

  it('should handle UPDATE NEO with list of NEO has 6 items', () => {
    const data = [{ value: 1 }, { value: 2 }];
    const list = [
      { value: 1 }, { value: 2 }, { value: 3 },
      { value: 4 }, { value: 5 }, { value: 6 }
    ];
    
    expect(neo({ ...defaultState, data, list }, { type: UPDATE_NEO }))
      .toEqual({
        ...defaultState,
        data: [{ value: 2 }],
        list: [
          { value: 2 }, { value: 3 }, { value: 4 }, 
          { value: 5 }, { value: 6 }, { value: 1 },
        ]
      })
  });

  it('should handle FETCH NEO', () => {
    expect(neo(defaultState, { type: FETCH_NEO })).toEqual({ ...defaultState, fetching: true });
  })

  it('should handle FETCH NEO ERROR', () => {
    expect(neo(defaultState, { type: FETCH_NEO_ERROR, payload: 'Error' }))
      .toEqual({ ...defaultState, error: 'Error' })
  })
})