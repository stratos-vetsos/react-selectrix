import React from 'react';
import Selectrix from 'components/';

export default class App extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			value: '',
			multiple: true,
			searchable: true
		};

		this.setValue = this.setValue.bind( this );
		this.onRenderOption = this.onRenderOption.bind( this );
		this.onRenderSelection = this.onRenderSelection.bind( this );
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

		let options = [
			{
				key: 'a',
				label: 'Option A'
			},
			{
				key: 'b',
				label: 'Option B'
			},
			{
				key: 'c',
				label: 'Option C'
			},
			{
				key: 'd',
				label: 'Option D'
			},
			{
				key: 'e',
				label: 'Option E'
			},
			{
				key: 'f',
				label: 'Option F'
			},
			{
				key: 'stratos',
				label: 'Stratos'
			},
			{
				key: 'paok',
				label: 'PAOK'
			},
			{
				key: 'cron',
				label: 'Cron'
			},
			{
				key: 'test',
				label: 'Test'
			},
			{
				key: 'giorgos',
				label: 'Giorgos'
			},
			{
				key: 'antonis',
				label: 'Antonis'
			},
			{
				key: 'wxaman',
				label: 'Wx Aman'
			}
		];

		return(
			<div>
				<div>Current value is
					{ this.state.value !== '' &&
						<pre>
							{ this.state.multiple
								? ` ${ this.state.value.map( v => v.label ).join( ', ' ) }`
								: this.state.value.label
							}
						</pre>
					}
				</div>
				<select name="" id="">
					<option value="te">a</option>
					<option value="t2">2</option>
				</select>
				<input type="text" placeholder="test" style={{ marginBottom: 20  }}/>
				<Selectrix
					options={ options }
					onChange={ this.setValue }
					arrow={ true }
					placeHolderInside={ false }
					disabled={ false }
					className="mister-selectrix"
					selected={ 'f' }
					isOpen={ false }
					searchable={ this.state.searchable }
					multiple={ this.state.multiple }
					stayOpen={ false }
					commaSeperated={ false }
					singleLine={ true }
					lifo={ false }
					selectAllButton={ true }
					height={ 190 }
					checkBoxes={ false }
					materialize={ true }
					isDropDown={ false }
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
					tags={ true }
				/>
			</div>
		)

	}

}
