import React from 'react';
import moment from 'moment';

export default Component => ({ orders, key, editable, title }) => {
  if (!orders || !orders.length) return null; // return null for now
  const filterFunction = date => moment(Date.now()).diff(date, 'days');
  return (
    <Component
      orders={orders.filter(item => parseInt(filterFunction(item.createdAt)) <= key)}
      editable={editable}
      title={title}
    />
  );
};

