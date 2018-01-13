import { connect } from 'react-redux';
import { toggleSelect, selectItem, focusItem, getSelectedIndex, move, clearSelect, openSelect, closeSelect, focusSelect, blurSelect, handleKeyDown, maybeScroll, unlockMouseFocus, selectAll } from 'actions';
import App from './App';

const mapStateToProps = ( state ) => {

	const queryString = state.search.queryString.toLowerCase();

	let options = ! state.search.active || queryString === '' ? [ ... state.options ] : [ ... state.search.resultSet ];
	const originalCount = state.search.active ? options.length : state.options.length;

	if( state.settings.multiple && ! state.settings.commaSeperated ) {
		options = options.filter( o => ! state.selected.includes( o.key ) );
	}

    return {
		settings: state.settings,
		selected: state.selected,
		selectedIndex: state.selectedIndex,
		isOpen: state.isOpen,
		options,
		focused: state.focused,
		focusedItem: state.focusedItem,
		focusedItemIndex: state.focusedItemIndex,
		checkForScroll: state.checkForScroll,
		mouseEventLocked: state.mouseEventLocked,
		checkForHover: state.checkForHover,
		originalCount,
		height: state.height
	}

}

const mapDispatchToProps = ( dispatch ) => {

    return {

		toggleSelect: () => {
			dispatch( toggleSelect() );
		},

		selectItem: ( index ) => {
			dispatch( selectItem( index ) );
		},

		focusItem: ( index, mouseEvent = false ) => {
			dispatch( focusItem( index, mouseEvent ) );
		},

		openSelect: () => {
			dispatch( openSelect() );
		},

		move: () => {
			dispatch( move() );
		},

		getSelectedIndex: () => {
			dispatch( getSelectedIndex() );
		},

		clearSelect: ( event = false, stayOpen = false ) => {
			if( event ) {
				event.stopPropagation();
				event.nativeEvent.stopImmediatePropagation();
			}
			dispatch( clearSelect( stayOpen ) );
		},

		closeSelect: () => {
			dispatch( closeSelect() );
		},

		focusSelect: () => {
			dispatch( focusSelect() );
		},

		blurSelect: () => {
			dispatch( blurSelect() );
		},

		handleKeyDown: ( e ) => {
			dispatch( handleKeyDown( e ) );
		},

		maybeScroll: ( selectEl, itemEl ) => {
			dispatch( maybeScroll( selectEl, itemEl ) );
		},

		unlockMouseFocus: () => {
			dispatch( unlockMouseFocus() );
		},

		selectAll: () => {
			dispatch( selectAll() );
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
