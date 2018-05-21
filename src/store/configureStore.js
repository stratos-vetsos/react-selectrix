import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from 'reducers';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger();

export const configureStore = () => {
	const env = process.env.NODE_ENV;
	return env === 'development'
	? createStore(
		reducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
	: createStore( reducer, applyMiddleware( thunkMiddleware ) )
}

export default configureStore;
