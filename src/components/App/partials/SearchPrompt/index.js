import { connect } from 'react-redux';
import SearchPrompt from './SearchPrompt';

const mapStateToProps = ( state ) => {
    return {
		active: state.ajax.active
		&& state.ajax.fetchOnSearch
		&& state.ajax.searchPrompt
		&& state.search.queryString.length < state.ajax.minLength,
		requiredLength: state.ajax.minLength - state.search.queryString.length
	}

}

const mapDispatchToProps = ( dispatch ) => {

    return {



    }
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPrompt );
