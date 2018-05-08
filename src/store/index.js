import React from 'react';
import { Provider } from 'react-redux';
import App from 'components/';

const ReduxStore = ownProps => {
	return(
		<Provider store={ ownProps.store }>
			<App { ...ownProps } />
		</Provider>
	);
}

export default ReduxStore;
