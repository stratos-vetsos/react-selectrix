import React from 'react';
import ReactSelectrix from 'components/';

export default class App extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			value: '',
			multiple: true
		};

		this.setValue = this.setValue.bind( this );
	}

	setValue( value ) {
		console.log( value );
		this.setState( { value } );
	}

	render() {

		let options = [
			{
				value: 'a',
				text: 'Option A'
			},
			{
				value: 'b',
				text: 'Option B'
			},
			{
				value: 'c',
				text: 'Option C'
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
				<ReactSelectrix
					options={ options }
					onChange={ this.setValue }
					arrow={ true }
					placeHolderInside={ false }
					disabled={ false }
					className="custom-select"
					selected={ 'f' }
					isOpen={ false }
					searchable={ true }
					multiple={ this.state.multiple }
					stayOpen={ true }
					commaSeperated={ false }
					singleLine={ true }
					lifo={ false }
					selectAllButton={ true }
					height={ 190 }
					checkBoxes={ false }
					materialize={ true }
					isDropDown={ false }
					customKeys={ { key: 'url', label: 'title' } }
					ajax={{
						url: 'https://newsapi.org/v2/everything?apiKey=9342a9a707ca49c4b2da34e9ea238ea6',
						fetchOnSearch: true,
						q: '&q={q}',
						nestedKey: 'articles',
						minLength: 3
					}}
				/>
			</div>
		)

	}

}
