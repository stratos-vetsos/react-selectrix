import React from 'react';
import Selectrix from 'components/';

export default class App extends React.Component {

	constructor( props ) {

		super( props );

		this.changeSetting = this.changeSetting.bind( this );

		this.conditionals = {
			multiple: [ 'commaSeperated', 'lifo', 'selectAllButton' ],
			single: [ 'isDropDown', 'placeHolderInside' ]
		}

		this.state = {
			value: [],
			settings: {
				arrow: true,
				placeHolderInside: false,
				disabled: false,
				isOpen: false,
				searchable: true,
				multiple: true,
				stayOpen: true,
				commaSeperated: false,
				singleLine: false,
				lifo: false,
				selectAllButton: true,
				height: 200,
				checkBoxes: false,
				materialize: true,
				isDropDown: false,
				// customKeys={ { key: 'url', label: 'title' } }
				// ajax={{
				// 	url: 'https://newsapi.org/v2/everything?apiKey=9342a9a707ca49c4b2da34e9ea238ea6',
				// 	fetchOnSearch: true,
				// 	q: '&q={q}',
				// 	nestedKey: 'articles',
				// 	minLength: 3
				// }}
				// onRenderOption={ this.onRenderOption }
				// onRenderSelection={ this.onRenderSelection }
				tags: true
			}
		};

		this.setValue = this.setValue.bind( this );
		this.onRenderOption = this.onRenderOption.bind( this );
		this.onRenderSelection = this.onRenderSelection.bind( this );
	}

	changeSetting( e ) {

		const { type, name } = e.target;
		let value = type === 'checkbox' ? e.target.checked : e.target.value;

		if( type === 'radio' ) {

			value = value === 'false' ? false : true;
		}

		let settings = Object.assign( {}, this.state.settings );
		settings [ name ] = value;

		if( name === 'multiple' ) {
			const target = this.conditionals[ value ? 'single' : 'multiple' ];

			target.map( t => {
				settings[ t ] = false;
			} )

		}
		else if( this.conditionals.multiple.includes( name ) ) {
			settings[ 'multiple' ] = true;
		}
		else if( this.conditionals.single.includes( name ) ) {
			settings[ 'multiple' ] = false;
		}

		this.setState( {
			settings: Object.assign( {}, this.state.settings, settings )
		}, () => console.log( settings ) )

	}

	setValue( value ) {
		this.setState( { value } );
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

	render() {

		const options = [
			{
				key: 'javascript',
				label: 'Javascript'
			},
			{
				key: 'go',
				label: 'Go'
			},
			{
				key: 'ruby',
				label: 'Ruby On Rails'
			},
			{
				key: 'dotnet',
				label: '.NET'
			},
			{
				key: 'php',
				label: 'PHP'
			},
			{
				key: 'csharp',
				label: 'C#'
			},
			{
				key: 'java',
				label: 'JAVA'
			},
			{
				key: 'python',
				label: 'Python'
			}
		];

		const target = this.conditionals[ this.state.settings.multiple ? 'single' : 'multiple' ];

		return(
			<div className="example">
				<h2>What is your favourite programming language?</h2>
				<div className="example-wrapper">
					<div className="value-wrapper">
						Selections:
						{ this.state.value.length > 0
							? <span>
								{ this.state.settings.multiple
									? ` ${ this.state.value.map( v => v.label ).join( ', ' ) }`
									: this.state.value[ 0 ].label
								}
							</span>
							: <span>None</span>
						}
					</div>
					<Selectrix
						options={ options }
						onChange={ this.setValue }
						{ ... this.state.settings }
						// customKeys={ { key: 'url', label: 'title' } }
						// ajax={{
						// 	url: 'https://newsapi.org/v2/everything?apiKey=9342a9a707ca49c4b2da34e9ea238ea6',
						// 	fetchOnSearch: true,
						// 	q: '&q={q}',
						// 	nestedKey: 'articles',
						// 	minLength: 3
						// }}
						// onRenderOption={ this.onRenderOption }
						// onRenderSelection={ this.onRenderSelection }
					/>
					<div className="settings">
						<div>
							<div className="radio-wrapper">
								<input type="radio" name="multiple" checked={ ! this.state.settings.multiple } onChange={ this.changeSetting } value={ false } />
								<label>Single</label>
							</div>
							<div className="radio-wrapper">
								<input type="radio" name="multiple" checked={ this.state.settings.multiple } onChange={ this.changeSetting } value={ true } />
								<label>Multiple</label>
							</div>
						</div>
						{ Object.entries( this.state.settings ).map( ( [ key, value ] ) => {
							console.log( target );
							return(
								<div key={ `setting-${ key }` } className="form-group">
									<input type="checkbox" checked={ value } name={ key } onChange={ this.changeSetting } disabled={ target.includes( key ) } />
									<label>{ key }</label>
								</div>
							)
						} ) }
					</div>
				</div>

			</div>
		)

	}

}
