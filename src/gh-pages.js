import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const elRoot = document.getElementById( 'root' );

const render = () => {
	ReactDOM.render(
		<App />,
		elRoot
	)
}

render();

if( module.hot ) {
    module.hot.accept( () => render() );
}
