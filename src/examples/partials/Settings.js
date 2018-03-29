import React from 'react';
import PropTypes from 'prop-types';

export default class Settings extends React.Component {

	constructor( props ) {
		super( props );
		this.changeSetting = this.changeSetting.bind( this );
	}

	changeSetting( e ) {

		const { type, name } = e.target;
		const ajaxKeys = [ 'minLength', 'debounce' ];

		let value = type === 'checkbox' ? e.target.checked : e.target.value,
			settings = Object.assign( {}, this.props.settings );

		if( type === 'radio' ) {
			value = value === 'false' ? false : true;
		}
		else if( name === 'height' ) {
			value = parseInt( value );
		}

		ajaxKeys.includes( name )
		? settings.ajax = Object.assign( {}, settings.ajax, {
			[ name ]: value
		} )
		: settings[ name ] = value;

		if( name === 'multiple' ) {

			const target = this.props.conditionals[ value ? 'single' : 'multiple' ];

			target.map( t => {
				settings[ t ] = false;
			} )

			if( ! value ) {
				settings[ 'stayOpen' ] = value;
			}

		}

		this.props.assignSettings( settings );

	}

	render() {

		const { multiple, settings, target, disabled } = this.props;
		const ajaxDisabled = [ 'url', 'q', 'nestedKey', 'fetchOnSearch' ];

		return(
			<div className="settings">
				<form>
					<div>
						<div className="radio-wrapper">
							<input
								type="radio"
								name="multiple"
								checked={ ! multiple }
								onChange={ this.changeSetting }
								value={ false }
							/>
							<label>Single</label>
						</div>
						<div className="radio-wrapper">
							<input type="radio" name="multiple" checked={ multiple } onChange={ this.changeSetting } value={ true } />
							<label>Multiple</label>
						</div>
					</div>
					<div className="clearfix">
						{ Object.entries( settings ).map( ( [ key, value ] ) => {
							if( key === 'multiple' ) return null;
							return(
								<div key={ `setting-${ key }` } className="form-group">
									{ key !== 'height'
										? <input type="checkbox" checked={ value } name={ key } onChange={ this.changeSetting } disabled={ target.includes( key ) || disabled.includes( key ) } />
										: <input type="number" value={ value } min={ 0 } step={ 50 } name={ key } onChange={ this.changeSetting } />
									}
									<label>{ key }</label>
								</div>
							)
						} ) }
					</div>
					{ settings.hasOwnProperty( 'ajax' ) &&
						<div className="ajax-settings">
							{ Object.entries( settings.ajax ).map( ( [ k, v ] ) => {
								if( ajaxDisabled.includes( k ) ) return null;
								return(
									<div key={k} className="form-group">
										{ k === 'fetchOnSearch'
											? <input type="checkbox" checked={ v } name={ k } onChange={ this.changeSetting } disabled={ ajaxDisabled.includes( k ) } />
											: <input type="text" className="form-control" value={ v } name={ k } onChange={ this.changeSetting } disabled={ ajaxDisabled.includes( k ) } />
										}
										<label htmlFor="">{ k }</label>
									</div>
								)
							} ) }
						</div>
					}
				</form>
			</div>
		)
	}
}

Settings.defaultProps = {
	disabled: []
}

Settings.propTypes = {
	settings: PropTypes.object.isRequired,
	conditionals: PropTypes.object.isRequired,
	assignSettings: PropTypes.func.isRequired,
	multiple: PropTypes.bool.isRequired,
	target: PropTypes.array.isRequired,
	disabled: PropTypes.array.isRequired
}
