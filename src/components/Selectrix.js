import React from 'react';
import 'scss/react-selectrix.scss';
import PropTypes from 'prop-types';
import App from 'components/App/';

export default class Selectrix extends React.Component {

	constructor( props ) {

		super( props );

		const methods = [ 'handleMouseMove' ];

		methods.forEach( method => this[ method ] = this[ method ].bind( this ) );

		this.ref = null;
		this.rsBodyRef = null;

	}

	handleMouseMove() {
		if( ! this.state.mouseEventLocked ) {
			return;
		}
		this.setState( {
			mouseEventLocked: false
		} )
	}

	componentDidMount() {
		this.props.setupInstance( this.props );
	}

	componentDidUpdate( nextProps ) {
		this.props.updateInstance( nextProps );
	}

	render() {

		return(
			<App />
		);

	}
}

Selectrix.defaultProps = {
	id: '',
	options: [],
	height: 190,
	className: '',
	isOpen: false,
	placeHolderInside: false,
	placeholder: 'Please Select',
	arrow: true,
	defaultValue: false,
	multiple: false,
	disabled: false,
	onChange: () => {},
	onOpen: () => {},
	onClose: () => {},
	customScrollbar: false,
	searchable: true,
	stayOpen: false,
	initialized: false,
	commaSeperated: false,
	singleLine: false,
	lifo: false,
	selectAllButton: false,
	checkBoxes: false,
	materialize: false,
	isDropDown: false,
	customKeys: false,
	ajax: false,
	onRenderOption: false,
	onRenderSelection: false,
	tags: false,
	updateInstance: () => {}
}

Selectrix.propTypes = {
	options: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	height: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	className: PropTypes.string,
	isOpen: PropTypes.bool,
	placeHolderInside: PropTypes.bool,
	placeholder: PropTypes.string,
	arrow: PropTypes.bool,
	defaultValue: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.array,
		PropTypes.bool
	] ),
	multiple: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	customScrollbar: PropTypes.bool,
	searchable: PropTypes.bool,
	stayOpen: PropTypes.bool,
	commaSeperated: PropTypes.bool,
	singleLine: PropTypes.bool,
	lifo: PropTypes.bool,
	selectAllButton: PropTypes.bool,
	checkBoxes: PropTypes.bool,
	materialize: PropTypes.bool,
	isDropDown: PropTypes.bool,
	customKeys: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.bool
	] ),
	ajax: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.bool
	] ),
	onRenderOption: PropTypes.oneOfType( [
		PropTypes.func,
		PropTypes.bool
	] ),
	onRenderSelection: PropTypes.oneOfType( [
		PropTypes.func,
		PropTypes.bool
	] ),
	tags: PropTypes.bool,
	setupInstance: PropTypes.func.isRequired,
	updateInstance: PropTypes.func.isRequired
}
