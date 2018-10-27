import React from 'react';
import { Provider } from 'react-redux';
import App from 'components/';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from 'reducers';

const ReduxStore = ownProps => {
	const store = createStore( reducer, applyMiddleware( thunkMiddleware ) );
	return(
		<Provider store={ store }>
			<App { ...ownProps } />
		</Provider>
	);
}

export default ReduxStore;
