import { connect } from 'react-redux';
import Tags from './Tags';
import { createTag } from 'actions';

const mapStateToProps = ( state ) => {
    return {
		active: state.tags.enabled && state.tags.active,
		tag: state.search.queryString,
		focused: state.tags.focused,
		appendTagPrompt: state.settings.appendTagPrompt,
	}

}

const mapDispatchToProps = ( dispatch ) => {

    return {

		createTag: ( tag ) => {
			dispatch( createTag( tag ) );
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Tags );
