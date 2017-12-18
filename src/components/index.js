import { connect } from 'react-redux';
import { setupInstance } from 'actions';
import ReactSelectrix from './ReactSelectrix';

const mapStateToProps = ( state, ownProps ) => {

    return ownProps;

}

const mapDispatchToProps = ( dispatch ) => {

    return {

        setupInstance: ( props ) => {
            dispatch( setupInstance( props ) );
        }

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( ReactSelectrix );
