import { normalizeSelected, isInViewport, isEmpty, isNumeric, isString, isArray } from 'helpers';

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
export const FETCHING_OPTIONS = 'FETCHING_OPTIONS';
export const SETUP_AJAX_OPTIONS = 'SETUP_AJAX_OPTIONS';
export const CLEAR_OPTIONS = 'CLEAR_OPTIONS';
export const SET_QUERY_STRING = 'SET_QUERY_STRING';
export const CREATE_TAG = 'CREATE_TAG';
export const FOCUS_TAG = 'FOCUS_TAG';

export const createTag = ( tag ) => {
	return ( dispatch, getState ) => {

		let state = getState();
		const tagObj = { key: `tag-${ tag }`, label: tag };
		const options = [ ... state.options, tagObj ];
		const resultSet = [ ...state.search.resultSet, tagObj ];

		dispatch( {
			type: CREATE_TAG,
			tag,
			options,
			resultSet
		} );

		state = getState();
		const length = [ ... state.search.resultSet ].filter( o => ! state.selected.includes( o .key ) ).length;

		dispatch( selectItem( length - 1 ) );
		dispatch( {
			type: CLEAR_SEARCH
		} );

	}
}

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

		state.onChange( [ ... state.selectedIndex ].map( i => {
			return state.customKeys ? Object.assign( {}, {
				[ state.customKeys.key ]: state.options[ i ].key,
				[ state.customKeys.label ]: state.options[ i ].label
			} ) : state.options[ i ];
		} ) );

	}

}

export const checkForScroll = () => {
	return {
		type: CHECK_FOR_SCROLL
	}
}

export const setupInstance = ( props ) => {

	let { selected, selectedIndex } = normalizeSelected( props.selected, [ ... props.options ] );
	let customKeys = {},
		options = [ ... props.options ];

	let ajax = {
		active: false,
		url: '',
		debounce: 200,
		fetchOnSearch: false,
		q: '',
		fetching: false,
		needsUpdate: true,
		nestedKey: false,
		searchPrompt: true,
		minLength: 1
	};

	if( props.customKeys ) {
		const target = [ 'key', 'label' ];
		Object.keys( props.customKeys ).forEach( key => {
			if( target.includes( key ) ) {
				customKeys[ key ] = props.customKeys[ key ];
			}
		} );
	}

	customKeys = isEmpty( customKeys ) ? false : Object.assign( { key: 'key', label: 'label' }, customKeys );

	if( customKeys ) {
		options = options.map( o => {
			if( o.hasOwnProperty( customKeys.key ) && o.hasOwnProperty( customKeys.label ) ) {
				return {
					key: o[ customKeys.key ],
					label: o[ customKeys.label ]
				};
			}
			return null;
		} ).filter( x => x );
	}

	if( props.ajax && props.ajax.hasOwnProperty( 'url' ) && props.ajax.url !== '' ) {

		options = selected = selectedIndex = [];
		ajax.active = true;
		ajax.url = props.ajax.url;

		if( props.ajax.hasOwnProperty( 'debounce' ) && isNumeric( props.ajax.debounce ) ) {
			ajax.debounce = props.ajax.debounce;
		}

		if( props.ajax.fetchOnSearch && ! isEmpty( props.ajax.q ) && isString( props.ajax.q )  ) {
			ajax.fetchOnSearch = true;
			ajax.q = props.ajax.q;
		}

		if( props.ajax.hasOwnProperty( 'nestedKey' ) && isString( props.ajax.nestedKey ) ) {
			ajax.nestedKey = props.ajax.nestedKey;
		}

		if( props.ajax.hasOwnProperty( 'searchPrompt' ) ) {
			ajax.searchPrompt = ajax.fetchOnSearch && props.ajax.searchPrompt === false;
		}

		if( props.ajax.hasOwnProperty( 'minLength' ) && isNumeric( props.ajax.minLength ) && ajax.fetchOnSearch ) {
			ajax.minLength = props.ajax.minLength;
		}

	}

	return {
		type: SETUP_INSTANCE,
		props,
		selected,
		selectedIndex,
		options,
		customKeys,
		ajax
	}
}

export const clearOptions = () => {
	return {
		type: CLEAR_OPTIONS
	}
}

export const setQueryString = ( queryString ) => {
	return {
		type: SET_QUERY_STRING,
		queryString
	}
}

export const searchOptions = ( queryString ) => {

	return ( dispatch, getState ) => {

		if( queryString !== '' ) {

			const state = getState();

			if( ! state.isOpen ) {
				dispatch( openSelect() );
			}

			if( state.ajax.active && state.ajax.fetchOnSearch && queryString.length >= state.ajax.minLength ) {
				dispatch( clearOptions() );
				return dispatch( fetchOptions() )
				.then( dispatch( findFocusedItem() ) )
				.catch( err => console.error( err ) )
			}

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

		if( state.tags.active ) {
			return dispatch( focusTag() );
		}

		if( state.settings.multiple ) {
			return dispatch( focusItem( 0 ) );
		}

		state.search.active ? dispatch( focusItem( 0 ) ) : dispatch( checkForScroll() );

	}
}

export const focusTag = () => {
	return {
		type: FOCUS_TAG
	}
}

export const fetchOptions = () => {

	return( dispatch, getState ) => {
		return new Promise( ( resolve, reject ) => {

			let state = getState();
			if( ! state.isOpen ) {
				return;
			}

			dispatch( { type: FETCHING_OPTIONS } );


			let url = state.ajax.url;

			if( state.ajax.fetchOnSearch ) {
				url += state.ajax.q.replace( '{q}', state.search.queryString );
			}

			fetch( url )
			.then( res => {

				if( ! res.ok ) {
					throw `Your ajax url ${ state.ajax.url } failed with a status ${ res.status }`;
				}

				const contentType = res.headers.get( 'content-type' );
				if( contentType && contentType.includes( 'application/json' ) ) {
					return res.json();
				}
				else {
					throw `Your ajax url ${ state.ajax.url } response was not a json`;
				}

			} )
			.then( data => {
				if( state.ajax.nestedKey ) {
					if( ! data.hasOwnProperty( state.ajax.nestedKey ) ) {
						throw `Invalid nested key on ${ state.ajax.url } response`;
					}
					else {
						data = data[ state.ajax.nestedKey ];
					}
				}
				if( ! isArray( data ) ) {
					throw `Invalid data type on ${ state.ajax.url } response. Expected array.`;
				}
				dispatch( setupAjaxOptions( data ) );
				resolve( data );
			} )
			.catch( err => {
				reject( err );
			} )

		} )

	}

}

export const setupAjaxOptions = ( data ) => {

	return( dispatch, getState ) => {

		let state = getState();
		if( ! state.isOpen ) {
			return;
		}

		const key = state.customKeys && state.customKeys.hasOwnProperty( 'key' ) ? state.customKeys.key : 'key';
		const labelKey = state.customKeys && state.customKeys.hasOwnProperty( 'label' ) ? state.customKeys.label : 'label';

		const options = data.map( d => {

			if( ! d.hasOwnProperty( key ) || ! d.hasOwnProperty( labelKey ) ) {
				return null;
			}

			let item = {
				key: d[ key ],
				label: d[ labelKey ],
			};

			if( d.hasOwnProperty( 'disabled' ) && d.disabled ) {
				item[ 'disabled' ] = true;
			}

			return item;

		} ).filter( x => x );


		dispatch( {
			type: SETUP_AJAX_OPTIONS,
			options
		} )

	}

}

export const toggleSelect = () => {

	return ( dispatch, getState ) => {
		let state = getState();
		state.isOpen ? dispatch( closeSelect() ) : dispatch( openSelect() );
		// dispatch( {
		// 	type: state.isOpen ? CLOSE_SELECT : OPEN_SELECT
		// } )

		state = getState();


	}
}

export const selectAll = () => {

	return ( dispatch, getState ) => {
		dispatch( {
			type: SELECT_ALL
		} )

		const state = getState();
		state.onChange( [ ... state.selectedIndex ].map( i => {
			return state.customKeys ? Object.assign( {}, {
				[ state.customKeys.key ]: state.options[ i ].key,
				[ state.customKeys.label ]: state.options[ i ].label
			} ) : state.options[ i ];
		} ) );
	}
}

export const selectItem = ( index, isKeyboard = false ) => {

	return ( dispatch, getState ) => {

		let state = getState();
		let options = state.search.active ? state.search.resultSet : state.options;
		const selected = state.ajax.fetchOnSearch ? state.selected.map( s => s.key ) : state.selected;

		if( state.settings.multiple && ! state.settings.commaSeperated && ! state.settings.checkBoxes ) {
			options = [ ... options ].filter( o => ! selected.includes( o.key ) );
		}

		const targetIndex = state.search.active || ( state.settings.multiple && ! state.settings.commaSeperated && ! state.settings.checkBoxes )
			? state.options.findIndex( o => o.key === options[ index ].key )
			: index;

		if( ( state.settings.commaSeperated || state.settings.checkBoxes ) && state.selectedIndex.includes( targetIndex ) ) {
			return dispatch( removeItem( targetIndex ) );
		}
		else {
			if( options[ index ] ) {
				dispatch( {
					type: SELECT_ITEM,
					item: options[ index ],
					index: state.search.active || ( state.settings.multiple && selected.length ) ? targetIndex : index,
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
			state.onChange( [ ... state.selectedIndex ].map( i => {
				return state.customKeys ? Object.assign( {}, {
					[ state.customKeys.key ]: state.options[ i ].key,
					[ state.customKeys.label ]: state.options[ i ].label
				} ) : state.options[ i ];
			} ) );
		}
		else {

			state.onChange( state.customKeys ? Object.assign( {}, {
				[ state.customKeys.key ]: options[ index ].key,
				[ state.customKeys.label ]: options[ index ].label
			} ) : options[ index ] );

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

		if( state.ajax.active && ! state.ajax.fetchOnSearch && state.ajax.needsUpdate ) {
			dispatch( fetchOptions() )
			.then( () => dispatch( findFocusedItem() ) )
			.catch( err => console.error( err ) )
			return;
		}

		dispatch( findFocusedItem() );

	}

}

export const findFocusedItem = () => {

	return ( dispatch, getState ) => {

		const state = getState();

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
						if( state.tags.active ) {
							return dispatch( createTag( state.search.queryString ) );
						}
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
				if( state.search.active && state.search.queryString.length > 0 && [ 'Left', 'ArrowLeft' ].includes( key ) ) {
					return;
				}
				e.preventDefault();
				dispatch( moveFocus( 'up' ) );
				break;
			}

			case 'Down':
			case 'Right':
			case 'ArrowDown':
			case 'ArrowRight': {
				if( state.search.active && state.search.queryString.length > 0 && [ 'Right', 'ArrowRight' ].includes( key ) ) {
					return;
				}
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
				if( state.tags.active && index === 0 ) {
					targetIndex = 'tag';
				}
				else {
					targetIndex = index > 0 || placeHolderInside ? index - 1 : 0;
				}
			}
			else {
				targetIndex = index + 1 < options.length ? index + 1 : options.length - 1;
			}
		}
		else {
			if( state.tags.active && direction === 'up' ) {
				targetIndex = 'tag';
			}
			else {
				targetIndex = direction === 'up' ? options.length - 1 : placeHolderInside ? -1 : 0;
			}
		}

		if( targetIndex !== false ) {
			if( state.isOpen === false ) {
				dispatch( openSelect() );
			}
			targetIndex === 'tag' ? dispatch( focusTag() ) : dispatch( focusItem( targetIndex, false ) );
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
		const selected = state.ajax.fetchOnSearch ? state.selected.map( s => s.key ) : state.selected;

		if( state.settings.multiple && ! state.settings.commaSeperated && ! state.settings.checkBoxes ) {
			options = [ ... options ].filter( o => ! selected.includes( o.key ) );
		}

		if( options[ index ] || ( index === -1 && state.settings.placeHolderInside ) ) {
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
