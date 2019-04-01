import { connect } from 'react-redux';
import Searchable from './Searchable';
import { searchOptions, focusSelect, blurSelect, setQueryString, setTag } from 'actions';

const mapStateToProps = ( state ) => {

	return {
		settings: state.settings,
		selected: state.settings.multiple ? state.selected : state.selected.length > 0 ? state.options[ state.selectedIndex ] : null,
		isOpen: state.isOpen,
		queryString: state.search.queryString,
		focused: state.focused,
		ajax: state.ajax,
		tags: state.tags,
		maxTagLength: state.maxTagLength
	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		searchOptions: ( queryString ) => {
			dispatch( searchOptions( queryString ) )
		},

		focusSelect: () => {
			dispatch( focusSelect() );
		},

		setTag: ( queryString ) => {
			dispatch( setTag( queryString ) );
		},

		blurSelect: () => {
			dispatch( blurSelect() );
		},

		setQueryString: ( queryString ) => {
			dispatch( setQueryString( queryString ) );
		}

	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Searchable );
