import React from 'react';
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();

export default SomeComponent => data => props => data.map(details => <SomeComponent history={props.history} data={details} />);

