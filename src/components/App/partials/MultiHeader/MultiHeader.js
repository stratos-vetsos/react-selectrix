import React from 'react';
import Searchable from './../Header/partials/Searchable/';
import PropTypes from 'prop-types';

export default class MultiHeader extends React.Component {

	constructor( props ) {
		super( props );
	}

	getHTML() {

		const { selected, settings, selectedIndex, options, ajax } = this.props;
		const html = [];
		let iterable = [];

		if( selected.length === 0 ) {
			html.push( settings.searchable ? '' : settings.placeholder );
		}
		else {

			iterable = ajax.active && ajax.fetchOnSearch ? selected : selectedIndex;

			if( settings.commaSeperated ) {
				<span className="rs-commaseperated-wrapper">
					{ selectedIndex.map( s => options[ s ].label ).join( ', ' ) }
				</span>
			}
			else {
				iterable.map( s => {
					const key = ajax.active && ajax.fetchOnSearch ? s.key : s;
					const label = ajax.active && ajax.fetchOnSearch ? s.label : options[ s ].label;
					html.push(
						<div key={ `selection-${ key }` } className="rs-selection">
							<span className="rs-remove vertical-align" onClick={ ( e ) => {
								e.stopPropagation();
								this.props.removeItem( key )
							}}>
								<span>×</span>
							</span>
							{ label }
						</div>
					)
				} )
			}

		}

		if( settings.searchable ) {
			html.push( <Searchable /> );
		}

		return html;

	}

	render() {

		const props = this.props;
		const { settings, isOpen, selected, focused } = props;

		let toggleClassName = 'rs-toggle';

		if( focused ) {
			toggleClassName += ' rs-focused';
		}

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
				<div tabIndex="0" className={ toggleClassName }>
					{ this.getHTML() }
				</div>

			</div>
		)
	}
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
	focused: PropTypes.bool.isRequired,
	ajax: PropTypes.object.isRequired
}
