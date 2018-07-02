import { connect } from 'react-redux';
import { setupInstance } from 'actions';
import Selectrix from './Selectrix';
let index = 0;

const mapStateToProps = state => {
    return {
        id: state.id
    }
}

const mapDispatchToProps = ( dispatch ) => {

    return {

        setupInstance: ( props ) => {

            dispatch( setupInstance( Object.assign( {}, props, {
				id: `selectrix_instance_${ index }`
			} ) ) );

			index++;

        },

		updateInstance: ( props ) => {
			dispatch( setupInstance( props, true ) );
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Selectrix );
