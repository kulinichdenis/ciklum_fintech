import {
  startOfMonth,
  dateToString,
  upDay,
  prepareObjects
} from '../src/utils/helpers';

import { mockDate } from './mock';

const checkData = [
  { "closest": 1905935.25,
    "date": new Date('2018-03-09'),
    "estimated_diameter": 0.3420109247,
    "fastest": 75724.419860969,
    "hazardous_asteroid": 0
  },
  { "closest": 3987220,
    "date": new Date("2018-03-10"),
    "estimated_diameter": 0.1032856481,
    "fastest": 46464.5358548968,
    "hazardous_asteroid": 0 
  }
];

describe('test helpers functions', () => {
  it('should convert date to string', () => {
    const date = new Date(2018, 10, 20);
    expect(dateToString(date)).toEqual('2018-11-20');
    const displayWithZero = new Date(2018, 2, 3);
    expect(dateToString(displayWithZero)).toEqual('2018-03-03');
  });

  it('should create date 1th day of month', () => {
    const date = new Date(2018, 10, 20);
    expect(startOfMonth(date)).toEqual(new Date(2018, 10, 1));
  });

  it('should up day', () => {
    const date = new Date(2018, 10, 20);
    expect(upDay(date, 3)).toEqual(new Date(2018, 10, 23));
  });

  it('should prepare date for show', () => {
    expect(prepareObjects(mockDate)).toEqual(checkData);
  })
});
