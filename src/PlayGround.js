import React from 'react';
import Selectrix from 'components/';

export default class PlayGround extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			value: '',
			multiple: true,
			searchable: true,
			options: [
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
				}
			],
		};

		this.setValue = this.setValue.bind( this );
		this.onRenderOption = this.onRenderOption.bind( this );
		this.onRenderSelection = this.onRenderSelection.bind( this );
	}

	setValue( value ) {
		this.setState( { value } );
	}

	appendTag = ( tag ) => {
		const { options } = this.state;
		return new Promise(( resolve, rejects) => {
			setTimeout(() => {
				this.setState( { options: [ ...options, { value: tag, label: tag } ] } );
				resolve();
			}, 500 );
		});
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
		const { options, searchable, multiple } = this.state;
		return(
			<div className="container" style={{ padding: 15 }}>
				<div>Current value is :
					{ this.state.value !== '' &&
						<span>
							{ this.state.multiple
								? ` ${ this.state.value.map( v => v.label ).join( ', ' ) }`
								: this.state.value.label
							}
						</span>
					}
				</div>
				<Selectrix
					options={ options }
					onChange={ this.setValue }
					onAppendTag={ this.appendTag }
					arrow={ true }
					placeHolderInside={ false }
					disabled={ false }
					className="selectrix"
					isOpen={ false }
					searchable={ searchable }
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
					// defaultValue={ [ 'b10', 'c', 'f' ] }
					customKeys={ { key: 'value', label: 'label' } }
					// ajax={{
					// 	url: 'https://newsapi.org/v2/everything?apiKey=9342a9a707ca49c4b2da34e9ea238ea6',
					// 	fetchOnSearch: true,
					// 	q: '&q={q}',
					// 	nestedKey: 'articles',
					// 	minLength: 3
					// }}
					// onRenderOption={ this.onRenderOption }
					// onRenderSelection={ this.onRenderSelection }
					tags={ true }
				/>
			</div>
		)

	}

}
