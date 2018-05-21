import React from 'react';
import { Provider } from 'react-redux';
import App from 'components/';
import configureStore from 'store/configureStore';

const ReduxStore = ownProps => {

	const store = configureStore();

	return(
		<Provider store={ store }>
			<App { ...ownProps } />
		</Provider>
	);
	
}

export default ReduxStore;
