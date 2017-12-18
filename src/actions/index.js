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
	return {
		type: SEARCH_OPTIONS,
		queryString
	}
}

export const toggleSelect = () => {
	return ( dispatch, getState ) => {
		const state = getState();
		dispatch( {
			type: state.isOpen ? CLOSE_SELECT : OPEN_SELECT
		} )
	}
}

export const selectItem = ( index ) => {

	return ( dispatch, getState ) => {

		const state = getState();
		if( state.settings.multiple === false ) {
			if( state.options[ index ] ) {
				dispatch( {
					type: SELECT_ITEM,
					item: state.options[ index ],
					index
				} )
			}

			state.onChange( state.options[ index ] );

		}

	}
}

export const clearSelect = () => {

	return ( dispatch, getState ) => {

		const state = getState();
		if( state.settings.multiple === false ) {

			dispatch( { type: CLEAR_SELECT } )

			state.onChange( '' );

		}

	}
}

export const openSelect = () => {

	return {
		type: OPEN_SELECT
	}

}

export const closeSelect = () => {

	return {
		type: CLOSE_SELECT
	}

}

export const focusSelect = () => {

	return {
		type: FOCUS_SELECT
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
						dispatch( selectItem( state.focusedItemIndex ) );
					}
				}
				else {
					dispatch( openSelect() );
				}

				break;
			}
			case 'ArrowUp':
			case 'ArrowLeft': {
				e.preventDefault();
				dispatch( moveFocus( 'up' ) );
				break;
			}

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
		let index = false,
			targetIndex = false;

		if( state.focusedItem !== null ) {
			index = state.focusedItemIndex;
		}
		else {
			if( state.selected.length > 0 ) {
				index = state.selectedIndex[ 0 ];
			}
		}

		if( index !== false ) {
			if( direction === 'up' ) {
				targetIndex = index > 0 ? index - 1 : 0;
			}
			else {
				targetIndex = index + 1 < state.options.length ? index + 1 : state.options.length - 1;
			}

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
		if( state.options[ index ] ) {
			dispatch( {
				type: FOCUS_ITEM,
				item: state.options[ index ],
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
