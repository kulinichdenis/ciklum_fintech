import React from 'react';
import classNames from 'classnames';
import { dateToString } from '../../utils/helpers';

const TableRow = ({ date, estimated_diameter, fastest, closest, hazardous_asteroid, hightestHazardous }) => {
  const dangerous = hightestHazardous.some(value => value.date.getTime() === date.getTime()); 
  const classes = classNames({ Dangerous: dangerous });
  return (
    <tr className={classes}>
      <td>{dateToString(date)}</td>
      <td>{estimated_diameter}</td>
      <td>{hazardous_asteroid}</td>
      <td>{closest}</td>
      <td>{fastest}</td>
    </tr>
  )
}

export default TableRow;