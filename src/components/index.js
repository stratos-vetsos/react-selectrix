import { connect } from 'react-redux';
import { setupInstance } from 'actions';
import Selectrix from './Selectrix';

const mapStateToProps = ( state, ownProps ) => {

    return ownProps;

}

const mapDispatchToProps = ( dispatch ) => {

    return {

        setupInstance: ( props ) => {
            dispatch( setupInstance( props ) );
        },

		updateInstance: ( props ) => {
			dispatch( setupInstance( props, true ) );
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Selectrix );
