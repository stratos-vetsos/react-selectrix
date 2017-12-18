import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from 'reducers';

const loggerMiddleware = createLogger();
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

const elRoot = document.getElementById( 'root' );

const ReduxStore = () => (
	<Provider store={ store }>
		<App />
	</Provider>
);

const render = () => {
	ReactDOM.render(
		<AppContainer>
			<ReduxStore />
		</AppContainer>,
		elRoot
	)
}

render();

if( module.hot ) {
    module.hot.accept( () => render() );
}
