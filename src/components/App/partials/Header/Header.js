import React from 'react';
import AutoComplete from './partials/AutoComplete/';
import PropTypes from 'prop-types';

const Header = ( props ) => {

	const { settings, isOpen, selected } = props;

	return (
		<div className="rs-header" onClick={ props.toggleSelect }>

			{ ! settings.placeHolderInside && selected !== null &&
				<span className="rs-reset-wrapper vertical-align">
					<span className="rs-reset" onClick={ ( e ) => props.clearSelect( e ) }>×</span>
				</span>
			}
			{ settings.arrow &&
				<span className="rs-arrow-wrapper vertical-align">
					<span className={ `rs-arrow-indicator ${ isOpen ? 'up' : 'down' }` }></span>
				</span>
			}

			{ settings.autoComplete
				? <AutoComplete />
				: <div tabIndex="0" className="rs-toggle">
					{ selected === null ? settings.placeholder : selected.label }
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
	clearSelect: PropTypes.func.isRequired
}

export default Header;
