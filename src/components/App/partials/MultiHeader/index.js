import { connect } from 'react-redux';
import { clearSelect, removeItem, openSelect, toggleSelect } from 'actions';
import MultiHeader from './MultiHeader';

const mapStateToProps = ( state ) => {

    return {
		settings: state.settings,
		selected: state.selected,
		selectedIndex: state.selectedIndex,
		options: state.options,
		isOpen: state.isOpen,
		focused: state.focused,
		ajax: state.ajax,
		onRenderSelection: state.onRenderSelection
	}

}

const mapDispatchToProps = ( dispatch ) => {

    return {

		clearSelect: ( event = false ) => {
			if( event ) {
				event.stopPropagation();
				event.nativeEvent.stopImmediatePropagation();
			}
			dispatch( clearSelect() );
		},

		removeItem: ( index ) => {
			dispatch( removeItem( index ) );
		},

		openSelect: () => {
			dispatch( openSelect() );
		},

		toggleSelect: () => {
			dispatch( toggleSelect() );
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( MultiHeader );
