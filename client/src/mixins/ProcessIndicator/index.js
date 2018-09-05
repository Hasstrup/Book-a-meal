import React from 'react';
import { connect } from 'react-redux';
import './index.css';

const ProcessIndicatorSm = ({ status }) => (
  <div
      style={{
        display: status ? 'flex' : 'none',
        height: '80px',
        position: 'fixed',
        top: '0',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 500
    }}
    >
      <div className="spinner"></div>
    </div>
)

export const ProcessIndicatorLg = () => (
  <div style={{ display: 'flex', flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner"></div>
    </div>
)

const mapStateToProps = (state) => ({
    status: state.errors.processing
})
export default connect(mapStateToProps)(ProcessIndicatorSm);