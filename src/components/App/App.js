import React from 'react';
import { buildClassName } from 'helpers';
import PropTypes from 'prop-types';
import Header from './partials/Header/';
import MultiHeader from './partials/MultiHeader/';

export default class App extends React.Component {

	constructor( props ) {
		super( props );

		const methods = [
			'buildOptionClassName',
			'handleBodyClick',
			'handleKeyDown',
			'handleMouseMove',
			'checkIfHovered'
		];

		methods.forEach( method => this[ method ] = this[ method ].bind( this ) );

	}

	componentDidMount() {

		document.body.addEventListener( 'click', this.handleBodyClick );
		document.body.addEventListener( 'keydown', this.handleKeyDown );
		document.body.addEventListener( 'mousemove', this.handleMouseMove );

		if( ! this.props.settings.multiple && this.props.isOpen && this.props.checkForScroll && this.props.selected.length > 0 ) {
			this.props.maybeScroll( this.rsBodyRef, this[ `option-${ this.props.selectedIndex[ 0 ].toString() }` ] );
		}

	}

	componentWillUnmount() {
		document.body.removeEventListener( 'click', this.handleBodyClick );
		document.body.removeEventListener( 'keydown', this.handleKeyDown );
		document.body.removeEventListener( 'mousemove', this.handleMouseMove );
	}

	handleBodyClick( e ) {

		if( ! this.ref.contains( e.target ) ) {
			if( this.props.isOpen ) {
				this.props.closeSelect();
			}
			if( this.props.focused ) {
				this.props.blurSelect();
			}
		}

	}

	handleKeyDown( e ) {

		if( ! this.props.focused ) {
			return;
		}

		this.props.handleKeyDown( e );

	}

	checkIfHovered() {

		for( let i = 0; i < this.props.options.length; i++ ) {

			const option = this[ `option-${ i }` ];
			if( option && option.parentNode.querySelector( ':hover' ) === option ) {

				const scrollTop = this.rsBodyRef.scrollTop;
                const innerHeight = this.rsBodyRef.clientHeight;
                const scrollHeight = this.rsBodyRef.scrollHeight;

				if( this.props.options[ i ] && scrollTop !== 0 && scrollTop + innerHeight >= scrollHeight ) {
					this.props.focusItem( i - 1, true );
				}
				else {
					this.props.focusItem( i, true );
				}

				break;
			}
		}
	}

	componentDidUpdate() {

		if( this.props.settings.stayOpen && this.props.checkForHover ) {
			this.checkIfHovered();
			return;
		}

		if( this.props.isOpen && this.props.checkForScroll ) {

			if( this.props.focusedItem !== null ) {
				this.props.maybeScroll( this.rsBodyRef, this[ `option-${ this.props.focusedItemIndex.toString() }` ] );
			}
			else if( ! this.props.settings.multiple && this.props.selected.length > 0 ) {
				this.props.maybeScroll( this.rsBodyRef, this[ `option-${ this.props.selectedIndex[ 0 ].toString() }` ] );
			}

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

		if( this.props.hide ) {
			className += ' invisible';
		}

		return className.trim();
	}

	render() {

		const { options, settings, isOpen, selected } = this.props;
		const className = buildClassName( settings, isOpen, selected );

		return(

			<div
				className={ `react-selectrix${ className }` }
				ref={ ( ref ) => this.ref = ref }
				onFocus={ this.props.focusSelect }

			>
				<input type="hidden" value={ JSON.stringify( selected ) } />
				<div className="rs-wrapper">
					{ settings.multiple ? <MultiHeader /> : <Header /> }
					{ isOpen &&
						<div key={ 'rs-body' } className={ `rs-body${ isOpen ? '' : ' hidden' }` } ref={ ( ref ) => this.rsBodyRef = ref }>
							<ul>
								{ ! settings.multiple && settings.placeHolderInside &&
									<li
										onClick={ () => this.props.clearSelect() }
										className={ this.buildOptionClassName( { key: 'default' } ) }
										onMouseEnter={ () => ! this.props.mouseEventLocked ? this.props.focusItem( -1, true ) : '' }
									>
										{ settings.placeholder }
									</li>
								}
								{ options.map( ( o, index ) => {
									return(
										<li
											ref={ ( ref ) => this[ `option-${ index }` ] = ref }
											onClick={ () => this.props.selectItem( index ) }
											key={ `li-${index}` }
											className={ this.buildOptionClassName( o, index ) }
											onMouseOver={ () => {
												if( ! this.props.mouseEventLocked ) {
													this.props.focusItem( index, true );
												}
												else {
													if( settings.stayOpen ) {
														this.props.unlockMouseFocus();
													}
												}
											}}
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
	unlockMouseFocus: PropTypes.func.isRequired,
	checkForHover: PropTypes.bool.isRequired,
	hide: PropTypes.bool.isRequired
}
