import React from 'react';
import Modal from 'react-modal';
import defaults from 'dummy/defaults';
import { modalStyles } from 'dummy/dummy-data';
import BasicExample from 'examples/BasicExample';
import AjaxExample from 'examples/AjaxExample';
import AjaxSearchExample from 'examples/AjaxSearchExample';
import { isObject, isString, isArray } from 'helpers';

export default class App extends React.Component {

	constructor( props ) {

		super( props );

		[ 'onRenderOption',
		'onRenderSelection',
		'getSource',
		'buildComponentSource',
		'handleBodyClick',
		'closeModal',
		'handleKeyDown',
		'copyCode' ]
		.forEach( fn => this[ fn ] = this[ fn ].bind( this ) );

		this.state = {
			modalIsOpen: false,
			copied: false,
			src: ''
		}

	}

	componentWillMount() {
		document.body.addEventListener( 'click', this.handleBodyClick );
		document.body.addEventListener( 'keydown', this.handleKeyDown );
	}

	componentWillUnmount() {
		document.body.removeEventListener( 'click', this.handleBodyClick );
		document.body.removeEventListener( 'keydown', this.handleKeyDown );
	}

	handleBodyClick( e ) {
		if( this.state.modalIsOpen ) {
			if( this.modalRef && ! this.modalRef.contains( e.target ) ) {
				this.setState( {
					modalIsOpen: false
				} )
			}
		}
	}

	closeModal() {
		this.setState( { modalIsOpen: false } );
	}

	handleKeyDown( e ) {
		if( e.key === 'Escape' && this.state.modalIsOpen ) {
			this.closeModal();
		}
	}

	getSource( activeSettings ) {

		this.setState( {
			modalIsOpen: true,
			src: this.buildComponentSource( activeSettings )
		} )

	}

	buildComponentSource( activeSettings ) {
		let options = '';
		for( let [ key, value ] of Object.entries( activeSettings ) ) {
			if( value !== defaults[ key ] ) {
				if( isObject( value ) ) {
					options += `\n\t${ key }={{`;
					for( let [ nkey, nvalue ] of Object.entries( value ) ) {
						if( isString( nvalue ) ) {
							nvalue = `"${ nvalue }"`;
						}
						options += `\n\t\t${ nkey }: ${ nvalue },`;
					}
					options = options.slice( 0, -1 );
					options += '\n\t}}';
				}
				else if( isArray( value ) ) {
					options += `\n\t${ key }={[`;
					for( let nvalue of value ) {
						options += `\n\t\t{`;
						for( let [ nnkey, nnvalue ] of Object.entries( nvalue ) ) {

							if( isString( nnvalue ) ) {
								nnvalue = `"${ nnvalue }"`;
							}
							options += `\n\t\t\t${ nnkey }: ${ nnvalue },`;
						}
						options = options.slice( 0, -1 );
						options += '\n\t\t},';
					}
					options = options.slice( 0, -1 );
					options += '\n\t]}';
				}
				else {
					options += `\n\t${ key }={${ value }}`;
				}
			}
		}
		return `<Selectrix ${ options } \n/>`;
	}

	onRenderOption( option, index ) {
		return(
			<li>{ option.label }</li>
		)
	}

	onRenderSelection( selected, settings, deselect ) {
		return(
			<p><span onClick={ deselect }>remove</span>{ selected.label }</p>
		)
	}

	copyCode() {

		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents( this.srcRef );
		selection.removeAllRanges();
		selection.addRange( range );
		try {
			document.execCommand( 'copy' );
			selection.removeAllRanges();
			this.setState( { copied: true },
				() => setTimeout( () => this.setState( { copied: false } ), 1400 )
			)
		} catch( e ) {
			console.error( e );
		}
	}

	render() {

		return(
			<div className="examples">
				<Modal
					isOpen={ this.state.modalIsOpen }
					contentLabel="Modal"
					style={ modalStyles }
					ariaHideApp={ false }
					closeTimeoutMS={ 150 }
				>
					<div
						className="component-source"
						style={{ whiteSpace: 'pre-wrap' }}
						ref={ ref => this.modalRef = ref }
					>
						<span className="close" onClick={ this.closeModal }>×</span>
						<div className="source-code" ref={ ref => this.srcRef = ref }>
							{ this.state.src }
						</div>
						<div className="actions">
							<button className={ `btn btn-primary blue${ this.state.copied ? ' disabled' : '' }` } onClick={ ( e ) => this.copyCode( e, this.state.src ) }>
								{ this.state.copied ? 'Copied successfully!' : 'Copy' }
							</button>
						</div>
					</div>
				</Modal>
				<BasicExample defaults={ defaults } getSource={ this.getSource } />
				<AjaxExample defaults={ defaults } getSource={ this.getSource } />
				<AjaxSearchExample defaults={ defaults } getSource={ this.getSource } />
				{/* <TagsExample /> */}


			</div>
		)

	}

}
