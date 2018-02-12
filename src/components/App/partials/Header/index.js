import { connect } from 'react-redux';
import { toggleSelect, clearSelect } from 'actions';
import Header from './Header';

const mapStateToProps = ( state ) => {

    return {
		settings: state.settings,
		selected: state.selected.length > 0 ? state.options[ state.selectedIndex ] : null,
		isOpen: state.isOpen,
		focused: state.focused,
		onRenderSelection: state.onRenderSelection
	}

}

const mapDispatchToProps = ( dispatch ) => {

    return {

		toggleSelect: () => {
			dispatch( toggleSelect() );
		},

		clearSelect: ( event = false ) => {
			if( event ) {
				event.stopPropagation();
				event.nativeEvent.stopImmediatePropagation();
			}
			dispatch( clearSelect() );
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Header );
