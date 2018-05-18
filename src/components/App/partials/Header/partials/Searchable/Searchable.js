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
		this.focus = this.focus.bind( this );
		this.removeFocus = false;

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
			if( props.selected.length === 0 && props.settings.placeholder ) {
				size = props.settings.placeholder.length;
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

		if( nextProps.settings.multiple && ( this.props.queryString !== nextProps.queryString || this.props.selected.length !== nextProps.selected.length ) ) {
			this.calculateSize( nextProps );
		}

		if( nextProps.focused ) {
			this.removeFocus = false;
			if( this.input.id !== document.activeElement.id ) {
				this.input.focus();
			}

		}
		else {
			this.removeFocus = true;
			if( this.input.id === document.activeElement.id ) {
				this.input.blur();
			}
		}

	}

	focus() {

		if( ! this.removeFocus ) {
			this.input.focus();
		}

	}

	render() {

		let className = 'rs-searchable';
		const multiple = this.props.settings.multiple;
		const { focused, queryString } = this.props;
		let placeholder = '';

		if( multiple ) {
			if( this.props.selected.length === 0 ) {
				placeholder = this.props.settings.placeholder;
			}
		}
		else {
			className += ' rs-toggle';
			placeholder = this.props.selected && ! this.props.settings.isDropDown ? this.props.selected.label : this.props.settings.placeholder;
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
				id="searchable"
				className={ className }
				placeholder={ placeholder }
				value={ this.props.queryString }
				onBlur={ this.focus }
				onChange={ e => {
					const value = e.target.value;
					if( this.props.ajax.fetchOnSearch ) {
						this.props.setQueryString( value );
						return this.onSearch( value );
					}
					this.props.settings.searchable ? this.props.searchOptions( value ) : this.props.setTag( value );
				} }
				size={ this.state.size }
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
	tags: PropTypes.object.isRequired
}
