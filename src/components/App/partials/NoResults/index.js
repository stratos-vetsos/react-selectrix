import { connect } from 'react-redux';
import NoResults from './NoResults';

const mapStateToProps = ( state, ownProps ) => {

    return {
		active: ownProps.options.length === 0
			&& state.search.queryString.length > 0
			&& ! state.tags.active,
		queryString: state.search.queryString
	}

}

export default connect( mapStateToProps, undefined )( NoResults );
