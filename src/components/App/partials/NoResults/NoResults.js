import React from 'react';
import PropTypes from 'prop-types';

const NoResults = ( props ) => {

	if( ! props.active ) {
		return null;
	}

	return(
		<li className="rs-no-results">No results match &quot;{ props.queryString }&quot;</li>
	)

}

NoResults.propTypes = {
	active: PropTypes.bool.isRequired,
	queryString: PropTypes.string
}

export default NoResults;
