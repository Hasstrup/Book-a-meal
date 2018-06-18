import React from 'react';
/* eslint jsx-quotes: 0 */
const AnimatingBannerComponent = () => (
  <div className='landing-jumbo'>
    <div className='dangling-shapes'>
      <div className='triangle-up' />
      <div className='cone' />
      <div className='triangle-down' />
    </div>
    <p className='text-landing' onClick={() => clickedMe()}>
        Enjoy the really really <br />
        good things. Today.
    </p>
  </div>
)

const clickedMe = () => {
  console.log('clicked')
}

export default AnimatingBannerComponent
