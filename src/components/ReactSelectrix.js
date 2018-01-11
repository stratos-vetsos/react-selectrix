import React from 'react';
import 'scss/react-selectrix.scss';
import PropTypes from 'prop-types';
import App from 'components/App/';

export default class ReactSelectrix extends React.Component {

	constructor( props ) {

		super( props );

		const methods = [
			'handleMouseMove'
		];

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

	componentWillMount() {
		this.props.setupInstance( this.props );
	}

	render() {

		return(
			<App />
		);

	}
}

ReactSelectrix.defaultProps = {
	options: [],
	className: '',
	isOpen: false,
	placeHolderInside: true,
	placeholder: 'Please Select',
	arrow: true,
	selected: [],
	multiple: false,
	disabled: false,
	onChange: () => {},
	customScrollbar: false,
	searchable: true,
	stayOpen: false,
	initialized: false
}

ReactSelectrix.propTypes = {
	options: PropTypes.array.isRequired,
	className: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
	placeHolderInside: PropTypes.bool,
	placeholder: PropTypes.string.isRequired,
	arrow: PropTypes.bool,
	selected: PropTypes.oneOfType( [
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
	setupInstance: PropTypes.func.isRequired
}
