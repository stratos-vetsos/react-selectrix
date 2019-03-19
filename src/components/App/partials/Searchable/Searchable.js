import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'helpers';

export default class Searchable extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			size: props.settings.multiple ? '1' : '20'
		}

		this.calculateSize = this.calculateSize.bind( this );
		this.onSearch = this.onSearch.bind( this );

	}

	onSearch = debounce( ( value ) => {
		this.props.searchOptions( value );
	}, this.props.ajax.debounce )

	calculateSize( props ) {

		if( ! props.settings.multiple ) {
			return;
		}

		let size = 1;

		if( props.queryString === '' ) {
			if( props.selected.length === 0 && props.settings.inputPlaceholder ) {
				size = props.settings.inputPlaceholder.length;
			}
		}
		else {
			size = props.queryString.length;
		}

		this.setState( { size: size === 0 ? '1' : size.toString() } );

	}

	componentWillMount() {
		this.calculateSize( this.props );
	}

	componentWillReceiveProps( nextProps ) {

		if( nextProps.settings.multiple && ( this.props.queryString !== nextProps.queryString || this.props.selected.length !== nextProps.selected.length ) || this.props.settings.inputPlaceholder.length !== nextProps.settings.inputPlaceholder.length ) {
			this.calculateSize( nextProps );
		}

		if( nextProps.focused ) {
			this.input.focus();
		}

	}

	onChange = ( e ) => {
		const value = e.target.value;
		if( this.props.ajax.fetchOnSearch ) {
			this.props.setQueryString( value );
			return this.onSearch( value );
		}
		this.props.settings.searchable ? this.props.searchOptions( value ) : this.props.setTag( value );
	}

	render() {

		let className = 'rs-searchable';
		const multiple = this.props.settings.multiple;
		const { focused, queryString } = this.props;
		let placeholder = '';

		if( multiple ) {
			if( this.props.selected.length === 0 ) {
				placeholder = this.props.settings.inputPlaceholder;
			}
		}
		else {
			className += ' rs-toggle';
			placeholder = ! this.props.settings.searchBoxInside && this.props.selected && ! this.props.settings.isDropDown
				? this.props.selected.label
				: this.props.settings.inputPlaceholder;
		}

		if( focused ) {
			className += ' rs-focused';
		}

		if( queryString ) {
			className += ' rs-active';
		}

		return (
			<input
				ref={ ( ref ) => this.input = ref }
				onFocus={ this.props.focusSelect }
				type="text"
				className={ `searchable ${className}` }
				placeholder={ placeholder }
				value={ this.props.queryString }
				onChange={ this.onChange }
				size={ this.state.size }
				maxLength={this.props.maxTagLength.toString()}
			/>
		)

	}

}

Searchable.propTypes = {
	queryString: PropTypes.string,
	searchOptions: PropTypes.func.isRequired,
	focusSelect: PropTypes.func.isRequired,
	blurSelect: PropTypes.func.isRequired,
	selected: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.array,
	] ),
	settings: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	focused: PropTypes.bool.isRequired,
	ajax: PropTypes.object.isRequired,
	setQueryString: PropTypes.func.isRequired,
	setTag: PropTypes.func.isRequired,
	tags: PropTypes.object.isRequired,
	maxTagLength: PropTypes.number.isRequired
}
