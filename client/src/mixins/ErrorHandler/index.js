import React from 'react';
import { connect } from 'react-redux';

const ToastNotification =  ({ error, status }) => (
  <div style={{
        height: '80px',
        width: '300px',
        position: 'fixed',
        right: '40px',
        top: '50px',
        backgroundColor: '#212121',
        zIndex: 10,
        display: status ? 'block' : 'none',
        paddingRight: '10px',
        paddingLeft: '20px',
        paddingTop: '10px',
        paddingBottom: '20px',
        borderRadius: '2px'
    }}
    className="in-app-notifier"
  >
    <p style={{
        color: '#22C768',
        fontSize: '14px',
        fontFamily: 'apercu',
        fontWeight: '600',
        marginBottom: '-5px'
    }}
    > Jarvis
    </p>
    <p style={{
        color: 'white', 
        fontFamily: 'apercu',
        fontWeight: '400',
        fontSize: '12px'
    }}> { error } </p>
  </div>
);

const mapStateToProps = (state) => ({
    status: state.errors.status,
    error: state.errors.message
})

export default connect(mapStateToProps)(ToastNotification)