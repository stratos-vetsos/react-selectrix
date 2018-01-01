import { connect } from 'react-redux';
import Searchable from './Searchable';
import { searchOptions, focusSelect, blurSelect } from 'actions';

const mapStateToProps = ( state ) => {

    return {
		settings: state.settings,
		selected: state.selected.length > 0 ? state.options[ state.selectedIndex ] : null,
		isOpen: state.isOpen,
		queryString: state.search.queryString
	}

}

const mapDispatchToProps = ( dispatch ) => {

    return {

		searchOptions: ( queryString ) => {
			console.log( queryString );
			dispatch( searchOptions( queryString ) )
		},

		focusSelect: () => {
			dispatch( focusSelect() );
		},

		blurSelect: () => {
			dispatch( blurSelect() );
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Searchable );
