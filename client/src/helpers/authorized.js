import React from 'react';
import store from '../../store';

const GuardedComponent = SomeComponent => (props) => {
  if (!store.getState().users.current) return props.history.push('/');
  return (<SomeComponent  {...props} />);
};


export default GuardedComponent;
