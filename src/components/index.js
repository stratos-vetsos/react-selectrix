import { connect } from 'react-redux';
import { setupInstance } from 'actions';
import Selectrix from './Selectrix';

const mapStateToProps = ( state, ownProps ) => ownProps;

const mapDispatchToProps = ( dispatch ) => {

    return {

        setupInstance: ( props ) => {
            dispatch( setupInstance( props ) );
        }

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Selectrix );
