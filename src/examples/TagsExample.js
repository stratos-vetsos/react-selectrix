import React from 'react';
import { conditionals } from 'dummy/dummy-data';
import ShowValue from './partials/ShowValue';
import Settings from './partials/Settings';
import Selectrix from 'index.js';
import PropTypes from 'prop-types';

export default class TagsExample extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			value: [],
			settings: Object.assign( {}, this.props.defaults, {
				multiple: true,
				materialize: true,
				tags: true
			} )
		};

		[ 'assignSettings', 'setValue', 'closed' ]
		.forEach( fn => this[ fn ] = this[ fn ].bind( this ) );

	}

	assignSettings( settings ) {
		this.setState( {
			settings: Object.assign( {}, this.state.settings, settings )
		} )
	}

	setValue( value ) {
		const { multiple } = this.state.settings;
		this.setState( { value: multiple ? value : [ value ] } );
	}

	closed() {
		this.setState( {
			settings: Object.assign( {}, this.state.settings, {
				isOpen: false
			} )
		} )
	}

	render() {

		const { settings, value } = this.state;
		const { multiple } = settings;
		const target = conditionals[ multiple ? 'single' : 'multiple' ];
		const options = [
			{
				key: 'hotdog',
				label: 'Hot Dog'
			},
			{
				key: 'pizza',
				label: 'Pizza'
			}
		]

		return (
			<div className="example">
				<h2>Tags Example</h2>
				<h3>{ `Tag your favourite food${ multiple ? 's' : '' }!` }</h3>
				<div className="example-wrapper">
					<ShowValue value={ value } multiple={ multiple } />
					<Selectrix
						onChange={ this.setValue }
						options={ options }
						{ ... this.state.settings }
						onClose={ this.closed }
					/>
					<Settings
						multiple={ multiple }
						settings={ settings }
						target={ target }
						assignSettings={ this.assignSettings }
						conditionals={ conditionals }
					/>
					<div className="get-source">
						<button
							type="button"
							className="btn btn-primary blue"
							onClick={ () => this.props.getSource( Object.assign( {}, this.state.settings, { options, onChange: ' value => console.log( value ) ' } ) ) }
						>
							Get Source Code
						</button>
					</div>
				</div>
			</div>
		)
	}
}

TagsExample.propTypes = {
	defaults: PropTypes.object.isRequired,
	getSource: PropTypes.func.isRequired
}
