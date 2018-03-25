import React from 'react';
import TableRow from './TableRow';
import { dateToString, maxHazardousAsteroid  } from '../../utils/helpers';

const Table = ({ rows }) => {
  const hazardousAsteroids = rows.map(({ hazardous_asteroid, date }) => 
  ({ hazardous_asteroid, date }));
  const hightestHazardous = maxHazardousAsteroid(hazardousAsteroids);
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Max estimated diameter of NEO in kilometers</th>
          <th>Number of potentially hazardous NEOs</th>
          <th>Closest NEO</th>
          <th>Fastest NEO</th>
        </tr>
      </thead>
      <tbody>
        { rows.length === 0 ? 'Loading...' : rows.map(row =>
          (<TableRow
            key={dateToString(row.date)}
            {...row}
            hightestHazardous={hightestHazardous}
          />))
        }
      </tbody>
    </table>
  )
}

export default Table;
