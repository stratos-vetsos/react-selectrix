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
		this.setState( { value } );
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
					checkBoxes={ true }
				/>
			</div>
		)

	}

}
