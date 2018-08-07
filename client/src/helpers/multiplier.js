import React from 'react';
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();

export default SomeComponent => data => props => data.map(item => <SomeComponent {...props} data={item} />);

