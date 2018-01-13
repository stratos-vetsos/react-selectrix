import React from 'react';
import Searchable from './../Header/partials/Searchable/';
import PropTypes from 'prop-types';

const MultiHeader = ( props ) => {

	const { settings, isOpen, selected, selectedIndex, options, focused } = props;

	return (
		<div
			className="rs-header"
			onClick={ ( e ) => {
				if( settings.searchable ) {
					isOpen ? e.preventDefault() : props.openSelect();
				}
				else {
					props.toggleSelect();
				}
			}}
		>
			{ selected.length > 0 &&
				<span className="rs-reset-wrapper vertical-align">
					<span className="rs-reset" onClick={ ( e ) => props.clearSelect( e ) }>×</span>
				</span>
			}
			{ settings.arrow &&
				<span className="rs-arrow-wrapper vertical-align">
					<span className={ `rs-arrow-indicator ${ isOpen ? 'up' : 'down' }` }></span>
				</span>
			}
			<div tabIndex="0" className={ `rs-toggle${ focused ? ' rs-focused' : '' }` }>
				{ selected.length === 0
					? settings.searchable ? '' : settings.placeholder
					: settings.commaSeperated ? selectedIndex.map( s => options[ s ].label ).join( ', ' ) : selectedIndex.map( s => (
						<div key={ `selection-${ s }` } className="rs-selection">
							<span className="rs-remove vertical-align" onClick={ ( e ) => {
								e.stopPropagation();
								props.removeItem( s )
							}}>
								<span>×</span>
							</span>
							{ options[ s ].label }
						</div>
					) )
				}
				{ settings.searchable &&
					<Searchable />
				}
			</div>

		</div>
	)
}

MultiHeader.propTypes = {
	settings: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	selected: PropTypes.array,
	openSelect: PropTypes.func.isRequired,
	clearSelect: PropTypes.func.isRequired,
	toggleSelect: PropTypes.func.isRequired,
	selectedIndex: PropTypes.array.isRequired,
	options: PropTypes.array.isRequired,
	removeItem: PropTypes.func.isRequired,
	focused: PropTypes.bool.isRequired
}

export default MultiHeader;
