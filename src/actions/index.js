import { normalizeSelected, isInViewport } from 'helpers';

export const SETUP_INSTANCE = 'SETUP_INSTANCE';
export const CLOSE_SELECT = 'CLOSE_SELECT';
export const OPEN_SELECT = 'OPEN_SELECT';
export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_MULTI_ITEM = 'SELECT_MULTI_ITEM';
export const FOCUS_ITEM = 'FOCUS_ITEM';
export const CLEAR_SELECT = 'CLEAR_SELECT';
export const FOCUS_SELECT = 'FOCUS_SELECT';
export const BLUR_SELECT = 'BLUR_SELECT';
export const SCROLL_SELECT = 'SCROLL_SELECT';
export const SEARCH_OPTIONS = 'SEARCH_OPTIONS';
export const UNLOCK_MOUSE_FOCUS = 'UNLOCK_MOUSE_FOCUS';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const CHECK_FOR_SCROLL = 'CHECK_FOR_SCROLL';
export const SELECT_ALL = 'SELECT_ALL';

export const removeItem = ( index ) => {

	return ( dispatch, getState ) => {

		dispatch( {
			type: REMOVE_ITEM,
			index
		} );

		const state = getState();

		if( state.settings.multiple && ! state.settings.commaSeperated && ! state.settings.checkBoxes ) {
			dispatch( focusItem( 0 ) );
		}
		state.onChange( [ ... state.selectedIndex ].map( i => state.options[ i ] ) );
	}

}

export const checkForScroll = () => {
	return {
		type: CHECK_FOR_SCROLL
	}
}

export const setupInstance = ( props ) => {

	const { selected, selectedIndex } = normalizeSelected( props.selected, [ ... props.options ] );

	return {
		type: SETUP_INSTANCE,
		props,
		selected,
		selectedIndex
	}
}

export const searchOptions = ( queryString ) => {

	return ( dispatch, getState ) => {

		if( queryString !== '' ) {
			dispatch( {
				type: SEARCH_OPTIONS,
				queryString
			} )
		}
		else {
			dispatch( {
				type: CLEAR_SEARCH
			} )
		}

		const state = getState();
		if( state.settings.multiple ) {
			dispatch( focusItem( 0 ) );
		}
		else {
			state.search.active ? dispatch( focusItem( 0 ) ) : dispatch( checkForScroll() );
		}


	}
}

export const toggleSelect = () => {

	return ( dispatch, getState ) => {
		let state = getState();
		dispatch( {
			type: state.isOpen ? CLOSE_SELECT : OPEN_SELECT
		} )

		state = getState();

		if( state.settings.isDropDown ) {
			return dispatch( focusItem( 0 ) );
		}

		if( state.isOpen && ( state.selected.length === 0 || state.settings.multiple || state.settings.checkBoxes ) && state.focusedItem === null ) {
			if( state.settings.checkBoxes && ! state.settings.multiple ) {
				dispatch( focusItem( state.selectedIndex[ 0 ] ) );
			}
			else if( state.settings.multiple && state.settings.commaSeperated && state.selected.length > 0 ) {
				const index = state.settings.lifo ? state.selectedIndex[ 0 ] : state.selectedIndex[ state.selectedIndex.length - 1 ];
				dispatch( focusItem( index ) );
			}
			else {
				dispatch( moveFocus( 'down' ) );
			}

		}

	}
}

export const selectAll = () => {
	return ( dispatch, getState ) => {
		dispatch( {
			type: SELECT_ALL
		} )
		const state = getState();
		state.onChange( [ ... state.selectedIndex ].map( i => state.options[ i ] ) );
	}
}

export const selectItem = ( index, isKeyboard = false ) => {

	return ( dispatch, getState ) => {

		let state = getState();
		let options = state.search.active ? state.search.resultSet : state.options;

		if( state.settings.multiple && ! state.settings.commaSeperated && ! state.settings.checkBoxes ) {
			options = [ ... options ].filter( o => ! state.selected.includes( o.key ) );
		}

		const targetIndex = state.search.active ? state.options.findIndex( o => o.key === options[ index ].key ) : index;

		if( ( state.settings.commaSeperated || state.settings.checkBoxes ) && state.selectedIndex.includes( targetIndex ) ) {
			return dispatch( removeItem( targetIndex ) );
		}
		else {
			if( options[ index ] ) {
				dispatch( {
					type: SELECT_ITEM,
					item: options[ index ],
					index: state.search.active || ( state.settings.multiple && state.selected.length ) ? targetIndex : index,
					isKeyboard
				} )
			}
		}

		state = getState();

		if( ! state.settings.checkBoxes && ! state.settings.commaSeperated && ! state.settings.isDropDown ) {

			if( isKeyboard ) {
				index === options.length - 1 ? dispatch( focusItem( index - 1 ) ) : dispatch( focusItem( index ) )
			}
			else {
				index === options.length - 1 ? dispatch( focusItem( index - 1 ) ) : '';
			}

		}

		if( state.settings.multiple ) {
			state.onChange( [ ... state.selectedIndex ].map( i => state.options[ i ] ) );
		}
		else {
			state.onChange( options[ index ] )
		}

	}
}

export const clearSelect = ( stayOpen = false ) => {

	return ( dispatch, getState ) => {

		const state = getState();
		dispatch( { type: CLEAR_SELECT, stayOpen } )
		state.onChange( '' );

	}
}

export const openSelect = () => {
	return ( dispatch, getState ) => {

		dispatch( {
			type: OPEN_SELECT
		} );

		const state = getState();
		if( state.settings.multiple ) {
			return dispatch( moveFocus( 'down' ) );
		}
		if( state.settings.isDropDown ) {
			return dispatch( focusItem( 0 ) );
		}
	}

}

export const closeSelect = () => {

	return {
		type: CLOSE_SELECT
	}

}

export const focusSelect = () => {

	return ( dispatch, getState ) => {
		if( ! getState().focused ) {
			dispatch( {
				type: FOCUS_SELECT
			} )
		}
	}

}

export const blurSelect = () => {

	return {
		type: BLUR_SELECT
	}

}

export const handleKeyDown = ( e ) => {

	return ( dispatch, getState ) => {

		const state = getState();
		const key = e.key;

		switch( key ) {
			case 'Enter': {
				e.preventDefault();
				if( state.isOpen ) {
					if( state.focusedItem !== null ) {
						dispatch( selectItem( state.focusedItemIndex, true ) );
					}
					else {
						dispatch( closeSelect() );
					}
				}
				else {
					dispatch( openSelect() );
				}

				break;
			}
			case 'Esc':
			case 'Escape': {
				dispatch( closeSelect() );
				break;
			}
			case 'Up':
			case 'Left':
			case 'ArrowUp':
			case 'ArrowLeft': {
				e.preventDefault();
				dispatch( moveFocus( 'up' ) );
				break;
			}

			case 'Down':
			case 'Right':
			case 'ArrowDown':
			case 'ArrowRight': {
				e.preventDefault();
				dispatch( moveFocus( 'down' ) );
				break;
			}

		}
	}
}

export const moveFocus = ( direction ) => {

	return ( dispatch, getState ) => {

		const state = getState();
		const placeHolderInside = ! state.settings.multiple && state.settings.placeHolderInside;
		let options = state.search.active ? state.search.resultSet : state.options;

		if( state.settings.multiple && ! state.settings.commaSeperated && ! state.settings.checkBoxes ) {
			options = [ ... options ].filter( o => ! state.selected.includes( o.key ) );
		}

		let index = false,
			targetIndex = false;

		if( state.focusedItem !== null ) {
			index = state.focusedItemIndex;
		}
		else {
			if( state.selected.length > 0 && ! state.settings.multiple && ! state.settings.isDropDown ) {
				if( state.search.active ) {
					index = options.findIndex( o => o.key === state.options[ state.selectedIndex ].key );
					if( index === -1 ) {
						index = false;
					}
				}
				else {
					index = state.selectedIndex[ 0 ];
				}
			}
		}

		if( index !== false ) {
			if( direction === 'up' ) {
				targetIndex = index > 0 || placeHolderInside ? index - 1 : 0;
			}
			else {
				targetIndex = index + 1 < options.length ? index + 1 : options.length - 1;
			}
		}
		else {
			targetIndex = direction === 'up' ? options.length - 1 : placeHolderInside ? -1 : 0;
		}

		if( targetIndex !== false ) {
			if( state.isOpen === false ) {
				dispatch( openSelect() );
			}
			dispatch( focusItem( targetIndex, false ) );
		}

	}
}

export const maybeScroll = ( selectEl, itemEl ) => {

	return ( dispatch ) => {

		const scroll = isInViewport( selectEl, itemEl );
		let scrollNum = 0;

		if( scroll ) {
			scrollNum = scroll;
			selectEl.scrollTop = scroll;
		}

		dispatch( {
			type: SCROLL_SELECT,
			active: scroll !== false,
			scroll: scrollNum
		} )
	}
}

export const focusItem = ( index, mouseEvent ) => {

	return ( dispatch, getState ) => {

		const state = getState();
		let options = state.search.active ? state.search.resultSet : state.options;

		if( state.settings.multiple && ! state.settings.commaSeperated && ! state.settings.checkBoxes ) {
			options = [ ... options ].filter( o => ! state.selected.includes( o.key ) );
		}

		if( options[ index ] || index === -1 ) {
			dispatch( {
				type: FOCUS_ITEM,
				item: index !== -1 ? options[ index ] : { key: 'default' },
				index,
				mouseEvent
			} )
		}

	}
}

export const unlockMouseFocus = () => {
	return {
		type: UNLOCK_MOUSE_FOCUS
	}
}
