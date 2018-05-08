import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from 'reducers';
import ReduxStore from 'store/';

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

const render = () => {
	ReactDOM.render(
		<AppContainer>
            <ReduxStore
                store={ store }
            />
		</AppContainer>,
		elRoot
	)
}

render();

if( module.hot ) {
	module.hot.accept( 'reducers', () => {
             store.replaceReducer( reducer );
	} );
}
