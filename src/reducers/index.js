import { SETUP_INSTANCE, CLOSE_SELECT, OPEN_SELECT, SELECT_ITEM, FOCUS_ITEM, CLEAR_SELECT, FOCUS_SELECT, BLUR_SELECT, SCROLL_SELECT, SEARCH_OPTIONS, UNLOCK_MOUSE_FOCUS, REMOVE_ITEM, CLEAR_SEARCH, CHECK_FOR_SCROLL, SELECT_ALL, FETCHING_OPTIONS, SETUP_AJAX_OPTIONS, CLEAR_OPTIONS, SELECT_ITEM_ASYNC } from 'actions';

const initialState = {
	settings: {
		className: '',
		placeHolderInside: true,
		placeholder: 'Please Select',
		arrow: true,
		multiple: false,
		disabled: false,
		customScrollbar: false,
		searchable: true,
		commaSeperated: false,
		singleLine: false,
		lifo: false,
		selectAllButton: false,
		checkBoxes: false,
		materialize: false,
		isDropDown: false
	},
	options: [],
	height: '150',
	isOpen: false,
	selected: [],
	selectedIndex: [],
	customKeys: false,
	initialized: false,
	focused: false,
	focusedItem: null,
	focusedItemIndex: null,
	mouseEventLocked: false,
	checkForScroll: false,
	checkForHover: false,
	scrolled: {
		active: false,
		scroll: 0
	},
	search: {
		active: false,
		queryString: '',
		resultSet: []
	},
	ajax: false,
	onChange: () => {}
};

const reducer = ( state = initialState, action ) => {

    switch( action.type ) {

		case SELECT_ALL: {

			let options = state.search.active ? [ ... state.search.resultSet ] : [ ... state.options ]
			.filter( o => ! state.selected.includes( o.key ) );

			let keys = options.map( o => o.key );
			let indexes = [ ... state.options ].map( ( option, index ) => keys.includes( option.key ) ? index : null ).filter( x => x !== null );

			if( state.settings.lifo ) {
				keys = keys.reverse();
				indexes = indexes.reverse();
			}

			return Object.assign( {}, state, {
				selected: state.settings.lifo ? [ ... keys, ... state.selected ] : [ ... state.selected, ... keys ],
				selectedIndex: state.settings.lifo ? [ ... indexes, ... state.selectedIndex ] : [ ... state.selectedIndex, ... indexes ],
				isOpen: state.settings.stayOpen
			} )

		}

		case REMOVE_ITEM: {

			return Object.assign( {}, state, {
				selected: state.ajax.active && state.ajax.fetchOnSearch
				? [ ... state.selected ].filter( k => k.key !== action.index )
				: [ ... state.selected ].filter( k => k !== state.options[ action.index ].key ),
				selectedIndex: [ ... state.selectedIndex ].filter( i => i !== action.index ),
				isOpen: true
			} )
		}

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
					searchable: action.props.searchable,
					stayOpen: action.props.stayOpen && ! action.props.isDropDown,
					commaSeperated: action.props.multiple && action.props.commaSeperated,
					singleLine: action.props.multiple && action.props.commaSeperated && action.props.singleLine,
					lifo: action.props.multiple && action.props.lifo,
					selectAllButton: action.props.multiple && action.props.selectAllButton,
					checkBoxes: action.props.checkBoxes,
					materialize: action.props.materialize,
					isDropDown: action.props.isDropDown && ! action.props.multiple
				} ),
				options: action.options,
				height: action.props.height,
				isOpen: action.props.isOpen,
				selected: action.selected,
				selectedIndex: action.selectedIndex,
				customKeys: action.customKeys,
				ajax: action.ajax,
				initialized: true,
				onChange: action.props.onChange,
				checkForScroll: action.props.isOpen
			} );
		}

		case SEARCH_OPTIONS: {

			const queryString = action.queryString.toLowerCase();
			return Object.assign( {}, state, {
				search: Object.assign( {}, state.search, {
					active: true,
					queryString: action.queryString,
					resultSet: state.ajax.active && state.ajax.fetchOnSearch ? state.options : state.options.filter( o =>
						o.label.toLowerCase().includes( queryString ) || o.key.toString().toLowerCase().includes( queryString )
					)
				} ),
				isOpen: true,
				focusedItem: null,
				focusedItemIndex: null
			} )
		}

		case CHECK_FOR_SCROLL: {
			return Object.assign( {}, state, {
				checkForScroll: true
			} )
		}

		case CLEAR_SEARCH: {
			return Object.assign( {}, state, {
				search: initialState.search,
				focusedItem: null,
				focusedItemIndex: null
			} )
		}

		case CLOSE_SELECT: {
			return Object.assign( {}, state, {
				isOpen: false,
				focusedItem: null,
				focusedItemIndex: null,
				search: initialState.search
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
				selectedIndex: [],
				focusedItem: null,
				focusedItemIndex: null,
				isOpen: action.stayOpen,
				search: action.stayOpen ? state.search : initialState.search
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
				selected: state.settings.multiple
					? state.settings.lifo
						? [ ... [ state.ajax.active && state.ajax.fetchOnSearch ? action.item : action.item.key ], ... state.selected ]
						: [ ... state.selected, ... [ state.ajax.active && state.ajax.fetchOnSearch ? action.item : action.item.key ] ]
					: [ action.item.key ],
				selectedIndex: state.ajax.active && state.ajax.fetchOnSearch
					? []
					: state.settings.multiple
						? state.settings.lifo
							? [ ... [ action.index ], ... state.selectedIndex ]
							: [ ... state.selectedIndex, ... [ action.index ] ]
						: [ action.index ],
				focusedItem: state.settings.stayOpen ? state.focusedItem : null,
				focusedItemIndex: state.settings.stayOpen ? state.focusedItemIndex : null,
				isOpen: state.settings.stayOpen,
				mouseEventLocked: state.settings.stayOpen,
				checkForHover: state.settings.stayOpen && ! action.isKeyboard,
				search: ( state.settings.stayOpen || state.ajax.active && state.ajax.fetchOnSearch ) && state.settings.searchable
					? state.search
					: initialState.search
			} )
		}

		case FOCUS_ITEM: {

			return Object.assign( {}, state, {
				focusedItem: action.item.key,
				focusedItemIndex: action.index,
				mouseEventLocked: ! action.mouseEvent,
				checkForScroll: ! action.mouseEvent,
				checkForHover: false
			} )
		}

		case UNLOCK_MOUSE_FOCUS: {
			return Object.assign( {}, state, {
				mouseEventLocked: false,
				checkForScroll: false,
				checkForHover: false
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

		case FETCHING_OPTIONS: {
			return Object.assign( {}, state, {
				ajax: Object.assign( {}, state.ajax, {
					fetching: true
				} )
			} )
		}

		case SETUP_AJAX_OPTIONS: {
			return Object.assign( {}, state, {
				options: action.options,
				ajax: Object.assign( {}, state.ajax, {
					fetching: false,
					needsUpdate: false
				} )
			} )
		}

		case CLEAR_OPTIONS: {
			return Object.assign( {}, state, {
				options: [],
				ajax: Object.assign( {}, state.ajax, {
					fetching: true
				} )
			} )
		}

		default: {
			return state;
		}

	}

}

export default reducer;
