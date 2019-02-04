import React from 'react';
import PropTypes from 'prop-types';

const Tags = ( props ) => {

	if( ! props.active ) {
		return null;
	}

	return(
		<div
			className={ `rs-tag-wrapper${ props.focused ? ' focused' : '' }` }
			onClick={ () => props.createTag( props.tag ) }
			ref={ ref => props.extractRef( ref ) }
		>
			{props.appendTagPrompt} &quot;{props.tag}&quot;
		</div>
	)

}

Tags.propTypes = {
	active: PropTypes.bool.isRequired,
	tag: PropTypes.string,
	createTag: PropTypes.func.isRequired,
	focused: PropTypes.bool.isRequired,
	extractRef: PropTypes.func.isRequired,
	appendTagPrompt: PropTypes.string,
}

export default Tags;
