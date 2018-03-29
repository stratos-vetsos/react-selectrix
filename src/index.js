import React from 'react';
import App from 'components/';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from 'reducers';

const loggerMiddleware = createLogger();

const ReduxStore = ( ownProps ) => {

	const store = createStore(
		reducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	);

	return(
		<Provider store={ store }>
			<App { ...ownProps } />
		</Provider>
	);
}

const render = () => {
	return(
		<AppContainer>
			<ReduxStore />
		</AppContainer>
	)
}

export default ReduxStore;
