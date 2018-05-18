import React from 'react';
import { buildClassName } from 'helpers';
import PropTypes from 'prop-types';
import Header from './partials/Header/';
import MultiHeader from './partials/MultiHeader/';
import SearchPrompt from './partials/SearchPrompt/';
import Tags from './partials/Tags/';
import NoResults from './partials/NoResults/';

export default class App extends React.Component {

	constructor( props ) {

		super( props );

		const methods = [
			'buildOptionClassName',
			'handleBodyClick',
			'handleKeyDown',
			'handleMouseMove',
			'checkIfHovered',
			'maybeScroll'
		];

		methods.forEach( method => this[ method ] = this[ method ].bind( this ) );

	}

	componentDidMount() {

		document.body.addEventListener( 'click', this.handleBodyClick );
		document.body.addEventListener( 'touchstart', this.handleBodyClick );
		document.body.addEventListener( 'keydown', this.handleKeyDown );
		document.body.addEventListener( 'mousemove', this.handleMouseMove );

		if( ( ! this.props.settings.multiple && ! this.props.settings.commaSeperated && ! this.props.settings.isDropDown ) && this.props.isOpen && this.props.checkForScroll && this.props.selected.length > 0 ) {
			this.props.maybeScroll( this.rsBodyRef, this[ `option-${ this.props.selectedIndex[ 0 ].toString() }` ] );
		}

	}

	componentWillUnmount() {
		document.body.removeEventListener( 'click', this.handleBodyClick );
		document.body.removeEventListener( 'touchstart', this.handleBodyClick );
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

		if( ! this.props.settings.stayOpen || ! this.props.checkForHover || this.props.settings.commaSeperated || this.props.settings.checkBoxes || this.props.settings.isDropDown || this.props.tags.focused ) {
			return;
		}

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

	maybeScroll() {

		if( ! this.props.isOpen || ! this.props.checkForScroll ) {
			return;
		}

		if( this.props.tags.focused ) {
			return this.props.maybeScroll( this.rsBodyRef, this.tagsRef );
		}

		if( this.props.focusedItem !== null ) {
			this.props.maybeScroll( this.rsBodyRef, this[ `option-${ this.props.focusedItemIndex.toString() }` ] );
		}
		else if( ! this.props.settings.multiple && this.props.selected.length > 0 ) {
			this.props.maybeScroll( this.rsBodyRef, this[ `option-${ this.props.selectedIndex[ 0 ].toString() }` ] );
		}

	}

	componentDidUpdate() {
		this.checkIfHovered();
		this.maybeScroll();

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

		if( ! this.props.settings.isDropDown && this.props.selected.includes( option.key ) ) {
			className += ' selected';
		}

		if( this.props.focusedItem !== null && this.props.focusedItem === option.key ) {
			className += ' focused';
		}

		return className.trim();
	}

	render() {

		const { options, settings, isOpen, selected, originalCount, ajax, onRenderOption, tags, queryString } = this.props;
		const className = buildClassName( settings, isOpen, selected, tags );

		return(

			<div
				className={ `react-selectrix${ className }` }
				ref={ ( ref ) => this.ref = ref }
				onFocus={ this.props.focusSelect }
			>
				<input type="hidden" value={ JSON.stringify( selected ) } />
				<div className="rs-wrapper">
					{ settings.multiple ? <MultiHeader /> : <Header /> }
					{ ( isOpen || settings.materialize ) &&
						<div
							className={ `rs-body${ isOpen ? '' : ' hidden' }` }
							ref={ ( ref ) => this.rsBodyRef = ref }
							style={{ maxHeight: this.props.height }}
						>
							<Tags extractRef={ ( ref ) => this.tagsRef = ref } />
							{ settings.selectAllButton &&
								<div className="rs-toggle-wrapper">
									<button
										type="button"
										className="rs-toggle-button"
										onClick={ () => originalCount > selected.length || ajax.fetchOnSearch ? this.props.selectAll() : this.props.clearSelect( false, true ) }>
										{ originalCount > selected.length || ajax.fetchOnSearch ? 'Select All' : 'Deselect All' }
									</button>
								</div>
							}
							<SearchPrompt />
							<ul>
								{ ajax.active && ajax.fetching &&
									<div className="rs-loader">
										Loading...
									</div>
								}
								<NoResults options={ options } />
								{ ! settings.multiple && settings.placeHolderInside && ! ajax.fetching && ajax.minLength <= queryString &&
									<li
										onClick={ this.props.clearSelect }
										className={ this.buildOptionClassName( { key: 'default' } ) }
										onMouseEnter={ () => ! this.props.mouseEventLocked ? this.props.focusItem( -1, true ) : '' }
									>
										{ settings.placeholder }
									</li>
								}
								{ options.map( ( o, index ) => {

									let jsx = (
										settings.checkBoxes ?
											<span className="rs-checkbox-wrapper">
												<input type="checkbox" checked={ this.props.selected.includes( o.key ) } readOnly />
												<label>{ o.label }</label>
											</span> :
											o.label
									);

									if( onRenderOption !== false ) {
										const html = onRenderOption( o, index );
										if( html ) jsx = html;
									}

									return(
										<li
											ref={ ( ref ) => this[ `option-${ index }` ] = ref }
											onClick={ () => this.props.selectItem( index ) }
											key={ `li-${index}` }
											className={ this.buildOptionClassName( o, index ) }
											onMouseOver={ () => {
												! this.props.mouseEventLocked
													? this.props.focusItem( index, true )
													: settings.stayOpen ? this.props.unlockMouseFocus() : ''
											} }
										>
											{ jsx }
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
	height: PropTypes.number.isRequired,
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
	selectAll: PropTypes.func.isRequired,
	originalCount: PropTypes.number.isRequired,
	ajax: PropTypes.object.isRequired,
	onRenderOption: PropTypes.oneOfType( [
		PropTypes.func,
		PropTypes.bool
	] ),
	tags: PropTypes.object.isRequired,
	queryString: PropTypes.string.isRequired
}
