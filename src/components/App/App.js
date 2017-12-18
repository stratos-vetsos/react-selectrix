import React from 'react';
import { buildClassName } from 'helpers';
import PropTypes from 'prop-types';
import Header from './partials/Header/';

export default class App extends React.Component {

	constructor( props ) {
		super( props );

		const methods = [
			'buildOptionClassName',
			'handleBodyClick',
			'handleKeyDown',
			'handleMouseMove'
		];

		methods.forEach( method => this[ method ] = this[ method ].bind( this ) );

	}

	componentDidMount() {

		document.body.addEventListener( 'click', this.handleBodyClick );
		document.body.addEventListener( 'keydown', this.handleKeyDown );
		document.body.addEventListener( 'mousemove', this.handleMouseMove );

		if( this.props.isOpen && this.props.checkForScroll && this.props.selected.length > 0 ) {
			this.props.maybeScroll( this.rsBodyRef, this[ `option-${ this.props.selectedIndex[ 0 ].toString() }` ] );
		}

	}

	componentWillUnmount() {
		document.body.removeEventListener( 'click', this.handleBodyClick );
		document.body.removeEventListener( 'keydown', this.handleKeyDown );
		document.body.removeEventListener( 'mousemove', this.handleMouseMove );
	}

	handleBodyClick( e ) {

		if( ! this.ref.contains( e.target ) && this.props.isOpen ) {
			this.props.closeSelect();
		}

	}

	handleKeyDown( e ) {

		if( ! this.props.focused ) {
			return;
		}

		this.props.handleKeyDown( e );

	}

	componentWillReceiveProps( nextProps ) {

		if( this.props.checkForScroll && this.props.focusedItem !== nextProps.focusedItem && nextProps.focusedItemIndex !== null ) {
			console.log( this.rsBodyRef.scrollTop );
			this.props.maybeScroll( this.rsBodyRef, this[ `option-${ nextProps.focusedItemIndex.toString() }` ] );
		}
	}

	componentDidUpdate() {

		if( this.props.isOpen && this.props.checkForScroll && this.props.selected.length > 0 ) {
			this.props.maybeScroll( this.rsBodyRef, this[ `option-${ this.props.selectedIndex[ 0 ].toString() }` ] );
		}
	}

	handleMouseMove() {
		if( this.props.mouseEventLocked ) {
			this.props.unlockMouseFocus();
		}
	}

	buildOptionClassName( option ) {

		let className = 'rs-option';
		if( option.hasOwnProperty( 'disabled' ) && option.disabled === true ) {
			className += ' disabled';
		}

		if( this.props.selected.includes( option.key ) ) {
			className += ' selected';
		}

		if( this.props.focusedItem !== null && this.props.focusedItem === option.key ) {
			className += ' focused';
		}

		return className.trim();
	}

	render() {

		const { options, settings, isOpen, selected } = this.props;
		const className = buildClassName( settings, isOpen );

		return(

			<div
				className={ `react-selectrix${ className }` }
				ref={ ( ref ) => this.ref = ref }
				onFocus={ this.props.focusSelect }
				onBlur={ this.props.blurSelect }
			>
				<input type="hidden" value={ JSON.stringify( selected ) } />
				<div className="rs-wrapper">
					{ settings.multiple ? 'multiheader' : <Header /> }
					{ isOpen &&
						<div key={ 'rs-body' } className={ `rs-body${ isOpen ? '' : ' hidden' }` } ref={ ( ref ) => this.rsBodyRef = ref }>
							<ul>
								{ settings.placeHolderInside &&
									<li className="rs-option" onClick={ () => this.props.clearSelect() }>{ settings.placeholder }</li>
								}
								{ options.map( ( o, index ) => {
									return(
										<li
											ref={ ( ref ) => this[ `option-${ index }` ] = ref }
											onClick={ () => this.props.selectItem( index ) }
											key={ `li-${index}` }
											className={ this.buildOptionClassName( o ) }
											onMouseEnter={ () => ! this.props.mouseEventLocked ? this.props.focusItem( index, true ) : '' }
										>
											{ o.label }
										</li>
									)
								} ) }
							</ul>
						</div>
					}
				</div>

			</div>
		)
	}
}


App.propTypes = {
	settings: PropTypes.object.isRequired,
	toggleSelect: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	isOpen: PropTypes.bool.isRequired,
	selected: PropTypes.array.isRequired,
	selectedIndex: PropTypes.array.isRequired,
	selectItem: PropTypes.func.isRequired,
	focusItem: PropTypes.func.isRequired,
	focusedItem: PropTypes.string,
	focusedItemIndex: PropTypes.number,
	clearSelect: PropTypes.func.isRequired,
	closeSelect: PropTypes.func.isRequired,
	focused: PropTypes.bool.isRequired,
	focusSelect: PropTypes.func.isRequired,
	blurSelect: PropTypes.func.isRequired,
	handleKeyDown: PropTypes.func.isRequired,
	maybeScroll: PropTypes.func.isRequired,
	checkForScroll: PropTypes.bool.isRequired,
	mouseEventLocked: PropTypes.bool.isRequired,
	unlockMouseFocus: PropTypes.func.isRequired
}
