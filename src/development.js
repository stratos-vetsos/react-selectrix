import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'main.scss';
import PlayGround from 'PlayGround';

const elRoot = document.getElementById( 'root' );

const render = () => {
	ReactDOM.render(
		<AppContainer>
			<PlayGround/>
		</AppContainer>,
		elRoot
	)
}

render();

if( module.hot ) {
	module.hot.accept();
}
