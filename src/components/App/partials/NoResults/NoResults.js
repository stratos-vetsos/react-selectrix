import React from 'react';
import PropTypes from 'prop-types';

const NoResults = ( props ) => {

	if( ! props.active ) {
		return null;
	}

	return(
		<li className="rs-no-results">{ props.settings.noResultsMessage } &quot;{ props.queryString }&quot;</li>
	)

}

NoResults.propTypes = {
	settings: PropTypes.object.isRequired,
	active: PropTypes.bool.isRequired,
	queryString: PropTypes.string
}

export default NoResults;
