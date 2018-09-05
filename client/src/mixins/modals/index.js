import React from 'react';

export default props => (
  <div
    style={{
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: 1000,
        top: 0,
        left: 0,
        display: 'flex'
    }}
    className="render-modal"
  >
    <div
      style={{
      position: 'absolute',
      top: 0,
      height: '100%',
      width: '100%',
      backgroundColor: '#1A1B1B50',
      zIndex: 10
   }}
      onClick={props.handleClose}
    />
    { props.children }
  </div>
);

