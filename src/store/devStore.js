import React from 'react';
import { Provider } from 'react-redux';
import PlayGround from 'PlayGround';

const ReduxStore = ownProps => {
	const store = ownProps.store;
	return(
		<Provider store={ store }>
			<PlayGround />
		</Provider>
	);
}

export default ReduxStore;
