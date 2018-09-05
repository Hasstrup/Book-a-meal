import React from 'react';


const images = {
  empty: 'https://png.icons8.com/ios/50/000000/empty-set.png',
  pizza: 'https://png.icons8.com/office/40/000000/pizza.png'

};
export default Component => (props) => {
  if (!props.determineRenderBy || !props.determineRenderBy.length) return (
    <div
      style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                display: 'flex',
                flexFlow: "column",
                justifyContent: 'center',
                alignItems: 'center',
                ...props.emptyContainerStyle
            }}
    >
      <img src={images[`${props.image || 'empty' }`]} />
      <p
        style={{
                fontSize: '16px',
                fontFamily: 'apercu',
                color: '#A6ACAF'
                }}
      >
        {props.text || 'Looks like we are not set up here'}
      </p>
      {
          props.callback && <p style={{ fontSize: '13px', fontFamily: 'apercu', color: '#E5E7E9' }}> Click <span className="hoverable-item" onClick={() => props.callback()} style={{ color: '#EC7063' }}> here </span> to {props.subtitle || 'get started'}</p>
    }
    </div>
  );
  console.log(Component);
  return (<Component {...props} />);
};
