import React from 'react';
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();

export default SomeComponent => data => props => data.map((item, index) => <SomeComponent {...props} data={item} key={`render-item-${item.id || index}`} />);

