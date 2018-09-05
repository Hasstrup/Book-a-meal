import React from 'react';
import DisplayOrderCard from '../../SingleOrderCard';
import RenderModal from '../../../../mixins/modals';

export default ({ data, handleClose }) => (
  <RenderModal display="none" handleClose={handleClose}>
    <DisplayOrderCard
      meals={data.Meals}
      order={data}
      style={{
            height: '55%',
            width: '40%',
            zIndex: 1000,
            alignSelf: 'center',
            right: '-25%'
        }}
    />
  </RenderModal>
);

