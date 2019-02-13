import React from 'react';
import Selectrix from 'index.js';

const options1 =  [
	{
		value: 'a10',
		label: 'Option A 10'
	},
	{
		value: 'b10',
		label: 'Option B'
	},
	{
		value: 'c',
		label: 'Option C'
	},
	{
		value: 'd',
		label: 'Option D'
	},
	{
		value: 'e',
		label: 'Option E'
	},
	{
		value: 'f',
		label: 'Option F'
	},
	{
		value: 'g',
		label: 'Option G'
	},
	{
		value: 'h',
		label: 'Option H'
	},
	{
		value: 'i',
		label: 'Option I'
	},
	{
		value: 'j',
		label: 'Option J'
	},
	{
		value: 'k',
		label: 'Option K'
	},
	{
		value: 'l',
		label: 'Option L'
	},
	{
		value: 'm',
		label: 'Option M'
	},
	{
		value: 'n',
		label: 'Option N'
	},
	{
		value: 'o',
		label: 'Option O'
	},
	{
		value: 'p',
		label: 'Option P'
	},
	{
		value: 'q',
		label: 'Option Q'
	},
	{
		value: 'r',
		label: 'Option R'
	},
];


const options2 =  [
	{
		value: 'i1',
		label: 'Item A 1'
	},
	{
		value: 'i2',
		label: 'Item 2'
	},
	{
		value: 'a10',
		label: 'Item 3'
	},
];

export default class PlayGround extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			value: '',
			multiple: true,
			searchable: true,
			options: options1,
		};

		this.setValue = this.setValue.bind( this );
		this.onRenderOption = this.onRenderOption.bind( this );
		this.onRenderSelection = this.onRenderSelection.bind( this );
		this.changeOptionsTimeout = null;
		this.emptyOptionsTimeout = null;
	}

	changeOptions(){
		if ( this.emptyOptionsTimeout ) {
			clearTimeout( this.emptyOptionsTimeout )
		}

		if ( this.changeOptionsTimeout ) {
			clearTimeout( this.changeOptionsTimeout )
		}
		this.emptyOptionsTimeout = setTimeout( ()=> {
			this.setState( { options: [] } );
		}, 5000
		);
		this.changeOptionsTimeout = setTimeout( ()=> {
			const { options } = this.state;
			if ( options === options2 ) {
				this.setState( { options: options1 } );
			} else {
				this.setState( { options: options2 } );
			}
		}, 6000	);
	}

	setValue( value ) {
		this.setState( { value } );
		//this.changeOptions();
	}

	appendTag = ( tag ) => {
		const { options } = this.state;
		return new Promise( ( resolve, reject ) => {
			setTimeout( () => {
				try {
					this.setState( { options: [ ...options, { value: tag, label: tag } ] } );
					resolve();
				} catch ( e ) {
					reject( e );
				}
			}, 500 );
		} );
	}
	onRenderOption( option ) {
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
		const { options, searchable, multiple, value } = this.state;
		const defaultValue = value.value ? value.value : typeof value.map === "function" ? value.map( item => item.value ): value

		return(
			<div className="container" style={{ padding: 15 }}>
				<div>Current value is :
					{ this.state.value  &&
						<span>
							{ this.state.multiple
								? ` ${ value.label ? value.label : typeof value.map === "function" ? value.map( item => item.label ).join( ', ' ) : value }`
								: this.state.value.label
							}
						</span>
					}
				</div>
				<div className="selectrix-wrapper">
					<Selectrix
						options={ options }
						onChange={ this.setValue }
						onAppendTag={ this.appendTag }
						placeholder="-Select One-"
						inputPlaceholder="Find Item"
						appendTagPrompt={"Add \"{searchtext}\" as a new item"}
						notFoundPrompt="Nothing was found by the text {searchtext}"
						arrow={ true }
						placeHolderInside={ false }
						searchBoxInside={ true }
						disabled={ false }
						className="selectrix"
						isOpen={ false }
						searchable={ searchable }
						multiple={ false }
						stayOpen={ false }
						commaSeperated={ false }
						singleLine={ false }
						lifo={ false }
						searchIndex={ false }
						selectAllButton={ false }
						height={ 190 }
						checkBoxes={ false }
						materialize={ true }
						isDropDown={ false }
						defaultValue={ defaultValue  }
						customKeys={ { key: 'value', label: 'label' } }
						disableStateVal={true}
						// ajax={{
						// 	url: 'https://newsapi.org/v2/everything?apiKey=9342a9a707ca49c4b2da34e9ea238ea6',
						// 	fetchOnSearch: true,
						// 	q: '&q={q}',
						// 	nestedKey: 'articles',
						// 	minLength: 3
						// }}
						// onRenderOption={ this.onRenderOption }
						// onRenderSelection={ this.onRenderSelection }
						tags={ false }
					/>

					<Selectrix
						options={ options }
						onChange={ this.setValue }
						onAppendTag={ this.appendTag }
						arrow={ true }
						placeholder="-My custom-"
						inputPlaceholder="Find Item"
						placeHolderInside={ false }
						searchBoxInside={ true }
						disabled={ false }
						className="selectrix"
						isOpen={ false }
						searchable={ true }
						multiple={ multiple }
						stayOpen={ false }
						commaSeperated={ false }
						singleLine={ false }
						lifo={ false }
						searchIndex={ false }
						selectAllButton={ true }
						height={ 190 }
						checkBoxes={ false }
						materialize={ true }
						isDropDown={ false }
						customKeys={ { key: 'value', label: 'label' } }
						tags={ true }
						id="second"
					/>

				</div>
			</div>
		)

	}

}
