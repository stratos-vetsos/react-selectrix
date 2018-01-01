import React from 'react';
import PropTypes from 'prop-types';

export default class Searchable extends React.Component {

	constructor( props ) {
		super( props );
	}

	render() {

		return (
			<input
				ref={ ( ref ) => this.input = ref }
				onFocus={ this.props.focusSelect }
				onBlur={ this.props.blurSelect }
				type="text"
				className="rs-toggle rs-searchable"
				placeholder={ this.props.selected ? this.props.selected.label : this.props.settings.placeholder }
				value={ this.props.queryString }
				onChange={ ( e ) => this.props.searchOptions( e.target.value ) }
			/>
		)

	}

}

Searchable.propTypes = {
	queryString: PropTypes.string,
	searchOptions: PropTypes.func.isRequired,
	focusSelect: PropTypes.func.isRequired,
	blurSelect: PropTypes.func.isRequired,
	selected: PropTypes.object,
	settings: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired
}
