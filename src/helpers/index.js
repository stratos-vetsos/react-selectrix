export const isArray = ( variable ) => (
	variable.constructor === Array ? true : false
)

export const isObject = ( variable ) => (
    variable !== null && typeof variable === 'object' ? true : false
)

export const isEmpty = ( variable ) => {

    if( variable.constructor === String ) {
        return variable === '' ? true : false;
    }
    else if( variable.constructor === Object ) {
        return Object.keys( variable ).length === 0 ? true : false;
    }
    else if( variable.constructor === Array ) {
        return variable.length === 0 ? true : false;
    }
    throw 'Incorrect variable type. Use object or array';
}
