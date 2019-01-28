import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import ReduxStore from 'store/devStore';
import configureStore from 'store/configureStore';

const elRoot = document.getElementById( 'root' );
const store = configureStore();

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
	module.hot.accept();
}
