import { SETUP_INSTANCE, CLOSE_SELECT, OPEN_SELECT, SELECT_ITEM, FOCUS_ITEM, CLEAR_SELECT, FOCUS_SELECT, BLUR_SELECT, SCROLL_SELECT, SEARCH_OPTIONS, UNLOCK_MOUSE_FOCUS } from 'actions';

const initialState = {
	settings: {
		className: '',
		placeHolderInside: true,
		placeholder: 'Please Select',
		arrow: true,
		multiple: false,
		disabled: false,
		customScrollbar: false,
		autoComplete: true
	},
	options: [],
	isOpen: false,
	selected: [],
	selectedIndex: [],
	initialized: false,
	focused: false,
	focusedItem: null,
	focusedItemIndex: null,
	mouseEventLocked: false,
	checkForScroll: false,
	scrolled: {
		active: false,
		scroll: 0
	},
	search: {
		active: false,
		queryString: ''
	},
	onChange: () => {}
};

const reducer = ( state = initialState, action ) => {

    switch( action.type ) {

		case SETUP_INSTANCE: {

			return Object.assign( {}, state, {
				settings: Object.assign( {}, state.props, {
					className: action.props.className,
					placeHolderInside: action.props.placeHolderInside,
					placeholder: action.props.placeholder,
					arrow: action.props.arrow,
					multiple: action.props.multiple,
					disabled: action.props.disabled,
					customScrollbar: action.props.customScrollbar,
					autoComplete: action.props.autoComplete
				} ),
				options: action.props.options,
				isOpen: action.props.isOpen,
				selected: action.selected,
				selectedIndex: action.selectedIndex,
				initialized: true,
				onChange: action.props.onChange,
				checkForScroll: action.props.isOpen
			} );
		}

		case SEARCH_OPTIONS: {
			return Object.assign( {}, state, {
				search: Object.assign( {}, state.search, {
					active: true,
					queryString: action.queryString
				} )
			} )
		}

		case CLOSE_SELECT: {
			return Object.assign( {}, state, {
				isOpen: false,
				search: Object.assign( {}, state.search, {
					active: false,
					queryString: ''
				} )
			} )
		}

		case OPEN_SELECT: {
			return Object.assign( {}, state, {
				isOpen: true,
				checkForScroll: true
			} )
		}

		case CLEAR_SELECT: {
			return Object.assign( {}, state, {
				selected: [],
				focusItem: null,
				isOpen: false,
				search: Object.assign( {}, state.search, {
					active: false,
					queryString: ''
				} )
			} )
		}

		case FOCUS_SELECT: {
			return Object.assign( {}, state, {
				focused: true
			} )
		}

		case BLUR_SELECT: {
			return Object.assign( {}, state, {
				focused: false
			} )
		}

		case SELECT_ITEM: {

			return Object.assign( {}, state, {
				selected: [ ... action.item.key ],
				selectedIndex: [ action.index ],
				focusedItem: null,
				isOpen: false,
				search: Object.assign( {}, state.search, {
					active: false,
					queryString: ''
				} )
			} )
		}

		case FOCUS_ITEM: {

			return Object.assign( {}, state, {
				focusedItem: action.item.key,
				focusedItemIndex: action.index,
				mouseEventLocked: ! action.mouseEvent,
				checkForScroll: ! action.mouseEvent
			} )
		}

		case UNLOCK_MOUSE_FOCUS: {
			return Object.assign( {}, state, {
				mouseEventLocked: false,
				checkForScroll: false
			} )
		}

		case SCROLL_SELECT: {
			return Object.assign( {}, state, {
				checkForScroll: false,
				scrolled: Object.assign( {}, state.scrolled, {
					active: action.active,
					scroll: action.scroll
				} )
			} )
		}

		default: {
			return state;
		}

	}

}

export default reducer;
