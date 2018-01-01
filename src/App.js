import React from 'react';
import ReactSelectrix from 'components/';

export default class App extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			value: ''
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
			}
		];

		return(
			<div>
				<p>Current value is <pre>{ this.state.value.label }</pre></p>
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
				/>
			</div>
		)

	}

}
