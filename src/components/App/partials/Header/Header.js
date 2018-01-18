import React from 'react';
import Searchable from './partials/Searchable/';
import PropTypes from 'prop-types';

const Header = ( props ) => {

	const { settings, isOpen, selected, focused } = props;

	return (
		<div className="rs-header" onClick={ props.toggleSelect }>

			{ ! settings.placeHolderInside && ! settings.isDropDown && selected !== null &&
				<span className="rs-reset-wrapper vertical-align">
					<span className="rs-reset" onClick={ ( e ) => props.clearSelect( e ) }>×</span>
				</span>
			}
			{ settings.arrow &&
				<span className="rs-arrow-wrapper vertical-align">
					<span className={ `rs-arrow-indicator ${ isOpen ? 'up' : 'down' }` }></span>
				</span>
			}
			{ settings.searchable
				? <Searchable />
				: <div tabIndex="0" className={ `rs-toggle${ focused ? ' rs-focused' : '' }` }>
					{ ( selected === null || settings.isDropDown ) ? settings.placeholder : selected.label }
				</div>
			}

		</div>
	)
}

Header.propTypes = {
	settings: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	selected: PropTypes.object,
	toggleSelect: PropTypes.func.isRequired,
	clearSelect: PropTypes.func.isRequired,
	focused: PropTypes.bool.isRequired
}

export default Header;
