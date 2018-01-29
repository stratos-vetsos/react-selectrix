import React from 'react';
import PropTypes from 'prop-types';

const SearchPrompt = ( props ) => {

	if( ! props.active ) return null;

	return (
		<div className="rs-search-prompt">
			Please enter { props.requiredLength } or more characters
		</div>
	)
}

export default SearchPrompt;

SearchPrompt.propTypes = {
	active: PropTypes.bool.isRequired,
	requiredLength: PropTypes.number.isRequired
}
