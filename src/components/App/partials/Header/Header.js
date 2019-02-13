import React from 'react';
import Searchable from '../Searchable/';
import PropTypes from 'prop-types';

const Header = ( props ) => {

	const { settings, isOpen, selected, focused, onRenderSelection, tags } = props;

	let jsx = (
		! settings.searchBoxInside && ( settings.searchable || tags.enabled )
			? <Searchable />
			: <div tabIndex="0" className={ `rs-toggle${ focused ? ' rs-focused' : '' }${selected ? ' rs-selected' : ''}` }>
				{ ( selected === null || selected === undefined || settings.isDropDown ) ? settings.placeholder : selected.label }
			</div>
	);

	if( ! settings.searchable && onRenderSelection !== false ) {
		const html = onRenderSelection( selected, settings );
		if( html ) jsx = html;
	}

	return (
		<div className="rs-header" onClick={ props.toggleSelect }>
			{ ! settings.searchBoxInside && ! settings.placeHolderInside && ! settings.isDropDown && selected !== null &&
				<span className="rs-reset-wrapper vertical-align">
					<span className="rs-reset" onClick={ ( e ) => props.clearSelect( e ) }>×</span>
				</span>
			}
			{ settings.arrow &&
				<span className="rs-arrow-wrapper vertical-align">
					<span className={ `rs-arrow-indicator ${ isOpen ? 'up' : 'down' }` }></span>
				</span>
			}
			{ jsx }

		</div>
	)
}

Header.propTypes = {
	settings: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	selected: PropTypes.object,
	toggleSelect: PropTypes.func.isRequired,
	clearSelect: PropTypes.func.isRequired,
	focused: PropTypes.bool.isRequired,
	onRenderSelection: PropTypes.oneOfType( [
		PropTypes.func,
		PropTypes.bool
	] ),
	tags: PropTypes.object.isRequired
}

export default Header;
