import { SETUP_INSTANCE, UPDATE_INSTANCE, CLOSE_SELECT, OPEN_SELECT, SELECT_ITEM, FOCUS_ITEM, CLEAR_SELECT, FOCUS_SELECT, BLUR_SELECT, SCROLL_SELECT, SEARCH_OPTIONS, UNLOCK_MOUSE_FOCUS, REMOVE_ITEM, CLEAR_SEARCH, CHECK_FOR_SCROLL, SELECT_ALL, FETCHING_OPTIONS, SETUP_AJAX_OPTIONS, CLEAR_OPTIONS, SET_QUERY_STRING, CREATE_TAG, FOCUS_TAG, SET_TAG } from 'actions';

const initialState = {
	settings: {
		className: '',
		placeHolderInside: true,
		placeholder: 'Please Select',
		appendTagPrompt: 'Create tag',
		searchBoxInside: false,
		arrow: true,
		multiple: false,
		disabled: false,
		searchIndex: true,
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
	tags: {
		enabled: false,
		active: false,
		focused: false,
		tagSet: []
	},
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
	onChange: () => {},
	onOpen: () => {},
	onClose: () => {},
};

const reducer = ( state = initialState, action ) => {

    switch( action.type ) {

		case FOCUS_TAG: {
			return Object.assign( {}, state, {
				tags: Object.assign( {}, state.tags, {
					focused: true
				} ),
				focusedItem: null,
				focusedItemIndex: null,
				checkForScroll: true
			} )
		}

		case CREATE_TAG: {
			return Object.assign( {}, state, {
				options: action.options,
				search: Object.assign( {}, state.search, {
					resultSet: action.resultSet
				} ),
				tags: Object.assign( {}, state.tags, {
					tagSet: [ ... state.tags.tagSet, action.tag ]
				} )
			} )
		}

		case SELECT_ALL: {

			const selected = state.ajax.fetchOnSearch ? state.selected.map( s => s.key ) : state.selected;
			let options = state.search.active ? [ ... state.search.resultSet ] : [ ... state.options ]
			options = options.filter( o => ! selected.includes( o.key ) );

			const keys = [ ... options ].map( o => o.key );
			let selectedKeys = state.ajax.fetchOnSearch ? options : keys;
			let indexes = [ ... state.options ].map( ( option, index ) => keys.includes( option.key ) ? index : null ).filter( x => x !== null );

			if( state.settings.lifo ) {
				selectedKeys = selectedKeys.reverse();
				indexes = indexes.reverse();
			}

			return Object.assign( {}, state, {
				selected: state.settings.lifo ? [ ... selectedKeys, ... state.selected ] : [ ... state.selected, ... selectedKeys ],
				selectedIndex: state.settings.lifo ? [ ... indexes, ... state.selectedIndex ] : [ ... state.selectedIndex, ... indexes ]
			} )

		}

		case REMOVE_ITEM: {

			return Object.assign( {}, state, {
				selected: state.ajax.active && state.ajax.fetchOnSearch
				? [ ... state.selected ].filter( k => k.key !== action.index )
				: [ ... state.selected ].filter( k => k !== state.options[ action.index ].key ),
				selectedIndex: [ ... state.selectedIndex ].filter( i => i !== action.index )
			} )
		}

		case SET_QUERY_STRING: {

			return Object.assign( {}, state, {
				search: Object.assign( {}, state.search, {
					active: true,
					queryString: action.queryString,
					resultSet: []
				} ),
				ajax: Object.assign( {}, state.ajax, {
					fetching: action.queryString.length >= state.ajax.minLength
				} ),
				options: []
			} )

		}

		case SETUP_INSTANCE:
		case UPDATE_INSTANCE: {
			return Object.assign( {}, state, {
				settings: Object.assign( {}, state.settings, {
					className: action.props.className,
					placeHolderInside: ! action.props.multiple && action.props.placeHolderInside,
					placeholder: action.props.placeholder,
					searchBoxInside: action.props.searchBoxInside,
					appendTagPrompt: action.props.appendTagPrompt
						? action.props.appendTagPrompt
						: state.settings.appendTagPrompt,
					arrow: action.props.arrow,
					multiple: action.props.multiple,
					disabled: action.props.disabled,
					searchIndex: action.props.searchIndex,
					customScrollbar: action.props.customScrollbar,
					searchable: action.props.searchable,
					stayOpen: action.props.hasOwnProperty( 'stayOpen' )
					? action.props.stayOpen && ! action.props.isDropDown
					: action.props.multiple ? true : false,
					commaSeperated: action.props.multiple && action.props.commaSeperated,
					singleLine: action.props.singleLine,
					lifo: action.props.multiple && action.props.lifo,
					selectAllButton: action.props.multiple && action.props.selectAllButton,
					checkBoxes: action.props.checkBoxes,
					materialize: action.props.materialize,
					isDropDown: action.props.isDropDown && ! action.props.multiple
				} ),
				options: action.type === UPDATE_INSTANCE && state.ajax.active && state.settings.multiple === action.props.multiple  && !action.props.onAppendTag
					? state.options
					: action.options,
				height: action.props.height,
				isOpen: action.props.isOpen ? action.props.isOpen : action.type === UPDATE_INSTANCE ? state.isOpen : false,
				selected: action.type === UPDATE_INSTANCE && state.ajax.active && state.settings.multiple === action.props.multiple ? state.selected : action.selected,
				selectedIndex: action.type === UPDATE_INSTANCE && state.ajax.active && state.settings.multiple === action.props.multiple ? state.selectedIndex : action.selectedIndex,
				customKeys: action.customKeys,
				ajax: action.ajax,
				initialized: true,
				onChange: action.props.onChange,
				onOpen: action.props.onOpen,
				onClose: action.props.onClose,
				onAppendTag: action.props.onAppendTag,
				checkForScroll: action.type === UPDATE_INSTANCE ? state.isOpen : action.props.isOpen,
				onRenderOption: action.props.onRenderOption,
				onRenderSelection: action.props.onRenderSelection,
				tags: Object.assign( {}, state.tags, {
					enabled: action.props.tags
				} ),
				id: action.props.id
			} );
		}

		case SET_TAG: {

			return Object.assign( {}, state, {
				tags: Object.assign( {}, state.tags, {
					enabled: state.tags.enabled,
					active: state.tags.enabled
					&& action.tag.length > 0
					&& action.tag.trim()
					&& state.options.find( o => o.label === action.tag ) === undefined
				} ),
				search: Object.assign( {}, state.search, {
					queryString: action.tag
				} )
			} );

		}

		case SEARCH_OPTIONS: {

			const queryString = action.queryString.toLowerCase();
			return Object.assign( {}, state, {
				search: Object.assign( {}, state.search, {
					active: true,
					queryString: action.queryString,
					resultSet: state.ajax.active && state.ajax.fetchOnSearch ? action.queryString.length < state.ajax.minLength ? [] : state.options : state.options.filter( o =>
						o.label.toLowerCase().includes( queryString ) || ( state.settings.searchIndex && o.key.toString().toLowerCase().includes( queryString ) )
					)
				} ),
				focusedItem: null,
				focusedItemIndex: null,
				tags: Object.assign( {}, state.tags, {
					enabled: state.tags.enabled,
					active: state.tags.enabled
					&& action.queryString.length > 0
					&& action.queryString.trim()
					&& state.options.find( o => o.label === action.queryString ) === undefined
				} )
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
				focusedItemIndex: null,
				options: state.ajax.active && state.ajax.fetchOnSearch ? [] : state.options,
				tags: Object.assign( {}, state.tags, {
					enabled: state.tags.enabled,
					active: false
				} )
			} )
		}

		case CLOSE_SELECT: {
			return Object.assign( {}, state, {
				isOpen: false,
				focusedItem: null,
				focusedItemIndex: null,
				search: initialState.search,
				options: state.ajax.fetchOnSearch && state.settings.multiple ? [] : state.options,
				ajax: Object.assign( {}, state.ajax, {
					fetching: false
				} ),
				tags: Object.assign( {}, state.tags, {
					enabled: state.tags.enabled,
					active: false
				} ),
				focused: action.blur ? false : state.focused
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
				search: action.stayOpen ? state.search : initialState.search,
				options: state.ajax.fetchOnSearch ? [] : state.options,
				tags: Object.assign( {}, state.tags, {
					enabled: state.tags.enabled,
					active: false
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
				selected: state.settings.multiple
					? state.settings.lifo
						? [ ... [ state.ajax.active && state.ajax.fetchOnSearch ? action.item : action.item.key ], ... state.selected ]
						: [ ... state.selected, ... [ state.ajax.active && state.ajax.fetchOnSearch ? action.item : action.item.key ] ]
					: [ action.item.key ],
				selectedIndex: state.settings.multiple
						? state.settings.lifo
							? [ ... [ action.index ], ... state.selectedIndex ]
							: [ ... state.selectedIndex, ... [ action.index ] ]
						: [ action.index ],
				focusedItem: state.settings.stayOpen && state.selected.length < state.options.length - 1 ? state.focusedItem : null,
				focusedItemIndex: state.settings.stayOpen && state.selected.length < state.options.length - 1 ? state.focusedItemIndex : null,
				mouseEventLocked: state.settings.stayOpen,
				checkForHover: state.settings.stayOpen && ! action.isKeyboard,
				search: state.settings.stayOpen && state.settings.searchable
					? state.search
					: initialState.search,
				tags: Object.assign( {}, state.tags, {
					enabled: state.tags.enabled,
					active: false
				} )
			} )
		}

		case FOCUS_ITEM: {

			return Object.assign( {}, state, {
				focusedItem: action.item.key,
				focusedItemIndex: action.index,
				mouseEventLocked: ! action.mouseEvent,
				checkForScroll: ! action.mouseEvent,
				checkForHover: false,
				tags: Object.assign( {}, state.tags, {
					focused: false
				} )
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
				} ),
				search: state.ajax.fetchOnSearch ? Object.assign( {}, state.search, {}, {
					active: true,
					resultSet: action.options
				} ) : state.search
			} )
		}

		case CLEAR_OPTIONS: {
			return Object.assign( {}, state, {
				options: [],
				ajax: Object.assign( {}, state.ajax, {
					fetching: true
				} ),
				search: Object.assign( {}, state.search, {
					resultSet: []
				} )
			} )
		}

		default: {
			return state;
		}

	}

}

export default reducer;
