import React from 'react';
import PT from 'prop-types';

function Button ({increment, text, objectId, clickFunc}) {
    return <button className="button" onClick={(event) => {clickFunc(increment, objectId, event)}}>{text}</button>
}

Button.propTypes = {
    increment: PT.string,
    text: PT.string.isRequired,    
    objectId: PT.string,
    clickFunc: PT.func.isRequired
}

export default Button;