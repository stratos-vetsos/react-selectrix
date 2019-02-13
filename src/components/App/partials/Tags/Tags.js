import React from 'react';
import PropTypes from 'prop-types';

const Tags = ( props ) => {

	if( ! props.active ) {
		return null;
	}
	const appendTagPrompt = props.appendTagPrompt.includes( '{searchtext}' )
		? props.appendTagPrompt.replace( '{searchtext}', props.tag )
		: `${props.appendTagPrompt} "${props.tag}"`
	return(
		<div
			className={ `rs-tag-wrapper${ props.focused ? ' focused' : '' }` }
			onClick={ () => props.createTag( props.tag ) }
			onMouseOver={props.onMouseOver}
			ref={ ref => props.extractRef( ref ) }
		>
			{appendTagPrompt}
		</div>
	)

}

Tags.defaultProps = {
	onMouseOver: () => {},
}

Tags.propTypes = {
	active: PropTypes.bool.isRequired,
	tag: PropTypes.string,
	createTag: PropTypes.func.isRequired,
	focused: PropTypes.bool.isRequired,
	extractRef: PropTypes.func.isRequired,
	appendTagPrompt: PropTypes.string,
	onMouseOver: PropTypes.func,
}

export default Tags;
