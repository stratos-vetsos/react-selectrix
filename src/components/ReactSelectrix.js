import React from 'react';
import 'scss/react-selectrix.scss';
import PropTypes from 'prop-types';
import { isArray } from 'helpers';

export default class ReactSelectrix extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			open: props.open,
			selected: this.normalizeSelected(),
			focused: false,
			options: props.options,
			focusedOption: null,
			mouseEventLocked: false
		}

		const methods = [ 'selectItem', 'toggleSelect', 'normalizeSelected', 'handleBodyClick', 'handleKeyDown', 'onFocus', 'onBlur', 'buildOptionClassName', 'move', 'close', 'isInViewport', 'handleMouseMove' ];
		methods.forEach( method => this[ method ] = this[ method ].bind( this ) );

		this.ref = null;
		this.rsBodyRef = null;

	}

	handleBodyClick( e ) {

		if( ! this.ref.contains( e.target ) && this.state.open ) {
			this.close();
		}

	}

	close() {
		this.setState( { open: false, focusedOption: null } )
	}

	handleKeyDown( e ) {

		if( ! this.state.focused ) {
			return;
		}

		e.preventDefault();

		const key = e.key;
		switch( key ) {
			case 'Enter': {
				if( this.state.open && this.state.focusedOption !== null ) {
					this.selectItem( this.state.focusedOption );
				}
				else {
					this.toggleSelect();
				}

				break;
			}
			case 'ArrowUp':
			case 'ArrowLeft': {
				this.move( 'up' );
				break;
			}

			case 'ArrowDown':
			case 'ArrowRight': {
				this.move( 'down' );
				break;
			}
		}
	}

	handleMouseMove() {
		if( ! this.state.mouseEventLocked ) {
			return;
		}
		this.setState( {
			mouseEventLocked: false
		} )
	}

	onFocus() {
		this.setState( { focused: true } );
	}

	onBlur() {
		this.setState( { focused: false } );
	}

	componentDidMount() {
		document.body.addEventListener( 'click', this.handleBodyClick );
		document.body.addEventListener( 'keydown', this.handleKeyDown );
		document.body.addEventListener( 'mousemove', this.handleMouseMove );
	}

	componentWillUnmount() {
		document.body.removeEventListener( 'click', this.handleBodyClick );
		document.body.removeEventListener( 'keydown', this.handleKeyDown );
		document.body.removeEventListener( 'mousemove', this.handleMouseMove );
	}

	getValue() {

		if( this.state.selected.length === 0 ) {
			return false;
		}
		return this.props.multiple ? this.state.selected : this.state.selected[ 0 ];
	}

	isInViewport( offset, element ) {

		if ( ! element ) return false;
		const top = element.offsetTop;
		if( ( top + offset ) <= 0 || ( top - offset ) > this.rsBodyRef.clientHeight ) {
			return ( ( top - offset ) - this.rsBodyRef.clientHeight ) + element.clientHeight;
		}
		return false;
	}

	focusOption( index, mouseEvent = false ) {

		let mouseEventLocked = false;

		if( ! mouseEvent ) {
			const scroll = this.isInViewport( 0, this[ `option-${index}` ] );
			if( scroll ) {
				this.rsBodyRef.scrollTop = scroll;
				mouseEventLocked = true;
			}
		}
		else {
			if( this.state.mouseEventLocked ) {
				return;
			}
		}

		this.setState( {
			focusedOption: index !== null ? this.state.options[ index ] : this.state.focusedOption !== null ? this.state.focusedOption : null,
			open: true,
			mouseEventLocked
		} )
	}

	normalizeSelected() {

		if( this.props.selected ) {
			if( isArray( this.props.selected ) ) {
				if( this.props.multiple ) {
					return [ ... this.props.options ].filter( o => this.props.selected.includes( o.key ) );
				}
				return [ ... this.props.options ].filter( o => o.key === this.props.selected[ 0 ] );
			}
			else {
				return [ ... this.props.options ].filter( o => o.key === this.props.selected );
			}
		}
		return [];

	}

	toggleSelect() {

		if( this.props.disabled ) {
			return;
		}

		this.setState( prevState => {
			return {
				open: ! prevState.open,
				focusedOption: null
			}
		}, () => console.log( this.state ) )

	}

	move( direction = 'down' ) {

		const value = this.state.focusedOption ? this.state.focusedOption : this.getValue();
		let key = null;

		if( value === false ) {
			if( this.state.options[ 0 ] ) {
				key = 0;
			}
		}
		else {
			for( let [ index, option ] of this.state.options.entries() ) {
				if( option.key === value.key ) {

					if( direction === 'up' ) {
						if( index > 0 ) {
							key = index - 1;
						}
					}
					else {
						if( index + 1 < this.state.options.length ) {
							key = index + 1;
						}
					}
					break;
				}
			}
		}

		this.focusOption( key );

	}

	selectItem( item, open = false, e = null ) {

		if( e ) {
			e.stopPropagation();
			e.nativeEvent.stopImmediatePropagation();
		}

		let selected = [];
		if( item !== null ) {
			if( this.props.multiple ) {
				console.log( 'wazup ' );
			}
			else {
				selected.push( item );
			}
		}

		this.setState( { selected, open }, () => {
			const value = selected.length > 0 ? this.props.multiple ? selected : selected[ 0 ] : '';
			this.props.onChange( value );
		} );

	}

	buildClassName( props ) {

		let targetProps = [ 'disabled', 'multiple', 'placeHolderInside', 'arrow' ],
			className = '';

		for( let [ key, value ] of Object.entries( props ) ) {
			if( value === true && targetProps.includes( key ) ) {
				className += `rs-base-${ key.toLowerCase() } `;
			}
		}

		if( props.className !== '' ) {
			className += props.className;
		}

		className = className.trim();

		return className !== '' ? ` ${ className }` : '';

	}

	buildOptionClassName( option ) {

		let className = 'rs-option';
		if( option.hasOwnProperty( 'disabled' ) && option.disabled === true ) {
			className += ' disabled';
		}

		for( let selected of this.state.selected ) {
			if( selected.key === option.key ) {
				className += ' selected';
			}
		}

		if( this.state.focusedOption !== null && this.state.focusedOption.key === option.key ) {
			className += ' focused';
		}

		return className.trim();
	}

	render() {

		const { options } = this.state;
		const className = this.buildClassName( this.props );

		return(
			<div
				className={ `react-selectrix${ className }` }
				tabIndex="0"
				ref={ ( ref ) => this.ref = ref }
				onFocus={ this.onFocus }
				onBlur={ this.onBlur }
			>
				<input type="hidden" value={ JSON.stringify( this.state.selected ) } />
				<div className="rs-wrapper">
					<div className="rs-header" onClick={ this.toggleSelect }>
						{ ! this.props.placeHolderInside && this.state.selected.length > 0 &&
							<span className="rs-reset" onClick={ ( e ) => this.selectItem( null, false, e ) }>×</span>
						}
						{ this.props.arrow &&
							<span className={ `rs-arrow-indicator ${ this.state.open ? 'up' : 'down' }` }></span>
						}
						{ this.state.selected.length > 0 ? this.state.selected[ 0 ].label : this.props.placeholder }
					</div>
					{ this.state.open &&
						<div className={ `rs-body${ this.state.open ? '' : ' hidden' }` } ref={ ( ref ) => this.rsBodyRef = ref }>
							<ul>
								{ this.props.placeHolderInside &&
									<li onClick={ () => this.selectItem( null ) }>{ this.props.placeholder }</li>
								}
								{ options.map( ( o, index ) => {
									return(
										<li
											ref={ ( ref ) => this[ `option-${ index }` ] = ref }
											onClick={ () => this.selectItem( o ) }
											key={ `li-${index}` }
											className={ this.buildOptionClassName( o ) }
											onMouseEnter={ () => this.focusOption( index, true ) }
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

ReactSelectrix.defaultProps = {
	options: [],
	className: '',
	open: false,
	placeHolderInside: true,
	placeholder: 'Please Select',
	arrow: true,
	selected: false,
	multiple: false,
	disabled: false,
	onChange: () => {}
}

ReactSelectrix.propTypes = {
	options: PropTypes.array.isRequired,
	className: PropTypes.string,
	open: PropTypes.bool.isRequired,
	placeHolderInside: PropTypes.bool,
	placeholder: PropTypes.string.isRequired,
	arrow: PropTypes.bool,
	selected: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.array,
		PropTypes.bool
	] ),
	multiple: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
}
