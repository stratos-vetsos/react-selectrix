import React from 'react';
import { Provider } from 'react-redux';
import App from 'components/';
import PlayGround from 'PlayGround';
import configureStore from 'store/configureStore';

const ReduxStore = ownProps => {
	const env = process.env.NODE_ENV;
	const store = env === 'development' ? ownProps.store : configureStore();
	return(
		<Provider store={ store }>
			{ env === 'development' ? <PlayGround /> : <App { ...ownProps } /> }
		</Provider>
	);
}

export default ReduxStore;
