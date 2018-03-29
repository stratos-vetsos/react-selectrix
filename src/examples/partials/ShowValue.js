import React from 'react';
import PropTypes from 'prop-types';

const ShowValue = ( { value, multiple } ) => {
	return (
		<div className="value-wrapper">
			Selections:
			{ value.length > 0
				? <span>
					{ multiple
						? ` ${ value.map( v => v.label ).join( ', ' ) }`
						: value[ 0 ].label
					}
				</span>
				: <span>None</span>
			}
		</div>
	)
}

ShowValue.propTypes = {
	value: PropTypes.array.isRequired,
	multiple: PropTypes.bool.isRequired
}

export default ShowValue;
