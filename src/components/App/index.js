import { connect } from 'react-redux';
import { toggleSelect, selectItem, focusItem, getSelectedIndex, move, clearSelect, openSelect, closeSelect, focusSelect, blurSelect, handleKeyDown, maybeScroll, unlockMouseFocus } from 'actions';
import App from './App';

const mapStateToProps = ( state ) => {

	const queryString = state.search.queryString.toLowerCase();

    return {
		settings: state.settings,
		selected: state.selected,
		selectedIndex: state.selectedIndex,
		isOpen: state.isOpen,
		options: ! state.search.active || queryString === '' ? state.options : state.options.filter( o =>
			o.label.toLowerCase().includes( queryString ) || o.key.toLowerCase().includes( queryString )
		),
		focused: state.focused,
		focusedItem: state.focusedItem,
		focusedItemIndex: state.focusedItemIndex,
		checkForScroll: state.checkForScroll,
		mouseEventLocked: state.mouseEventLocked
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

		clearSelect: ( event = false ) => {
			if( event ) {
				event.stopPropagation();
				event.nativeEvent.stopImmediatePropagation();
			}
			dispatch( clearSelect() );
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
		}

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
