import React from 'react';
import PropTypes from 'prop-types';

const NoResults = ( props ) => {

	if( ! props.active ) {
		return null;
	}
	const notFoundPrompt = props.includeTextInNotFoundPrompt
		? `${props.notFoundPrompt} "${props.queryString}"`
		: props.notFoundPrompt.replace( '{searchtext}', props.queryString );
	return(
		<li className="rs-no-results">{notFoundPrompt}</li>
	)

}

NoResults.propTypes = {
	active: PropTypes.bool.isRequired,
	queryString: PropTypes.string,
	notFoundPrompt: PropTypes.string,
	includeTextInNotFoundPrompt: PropTypes.bool,
}

export default NoResults;
