import { connect } from 'react-redux';
import NoResults from './NoResults';

const mapStateToProps = ( state, ownProps ) => {

	return {
		settings: state.settings,
		active: ownProps.options.length === 0
			&& state.search.queryString.length > 0
			&& ( ! state.ajax.active || ( state.ajax.minLength <= state.search.queryString.length && ! state.ajax.fetching ) )
			&& ! state.tags.active,
		queryString: state.search.queryString
	}

}

export default connect( mapStateToProps, undefined )( NoResults );
