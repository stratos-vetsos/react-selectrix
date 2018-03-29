import React from 'react';
import { conditionals } from 'dummy/dummy-data';
import ShowValue from './partials/ShowValue';
import Settings from './partials/Settings';
import Selectrix from 'index.js';
import PropTypes from 'prop-types';

export default class AjaxExample extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			value: [],
			settings: Object.assign( {}, this.props.defaults, {
				multiple: true,
				materialize: true,
				stayOpen: true,
				customKeys: { key: 'url', label: 'title' },
				ajax: {
					url: 'https://newsapi.org/v2/top-headlines?apiKey=9342a9a707ca49c4b2da34e9ea238ea6',
					fetchOnSearch: true,
					q: '&q={q}',
					nestedKey: 'articles',
					minLength: 3,
					debounce: 300
				}
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

		return (
			<div className="example">
				<h2>{ `What ${ multiple ? 'are' : 'is' } your favourite top headline${ multiple ? 's' : '' }` }, right now? ( AJAX - Free Search )</h2>
				<small>Many thanks to <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">newsapi.org</a> for their feeds.</small>
				<div className="example-wrapper">
					<ShowValue value={ value } multiple={ multiple } />
					<Selectrix
						onChange={ this.setValue }
						{ ... this.state.settings }
						onClose={ this.closed }
					/>
					<Settings
						multiple={ multiple }
						settings={ settings }
						target={ target }
						assignSettings={ this.assignSettings }
						conditionals={ conditionals }
						disabled={ [ 'ajax', 'customKeys' ] }
					/>
					<div className="get-source">
						<button
							type="button"
							className="btn btn-primary blue"
							onClick={ () => this.props.getSource( this.state.settings ) }
						>
							Get Source Code
						</button>
					</div>
				</div>
			</div>
		)
	}
}

AjaxExample.propTypes = {
	defaults: PropTypes.object.isRequired,
	getSource: PropTypes.func.isRequired
}
