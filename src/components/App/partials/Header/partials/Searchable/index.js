import { connect } from 'react-redux';
import Searchable from './Searchable';
import { searchOptions, focusSelect, blurSelect, setQueryString } from 'actions';

const mapStateToProps = ( state ) => {

    return {
		settings: state.settings,
		selected: state.settings.multiple ? state.selected : state.selected.length > 0 ? state.options[ state.selectedIndex ] : null,
		isOpen: state.isOpen,
		queryString: state.search.queryString,
		focused: state.focused,
		ajax: state.ajax
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

		blurSelect: () => {
			dispatch( blurSelect() );
		},

		setQueryString: ( queryString ) => {
			dispatch( setQueryString( queryString ) );
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Searchable );
