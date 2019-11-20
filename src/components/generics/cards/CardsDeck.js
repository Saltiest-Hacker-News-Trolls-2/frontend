/// external modules ///
import React from 'react';

/***************************************
  COMPONENT
***************************************/
const CardsDeck = ({ children , ...rest }) => {
  return (
    <ul className="cards-deck">
      {children.map ((card) => (
        <li>{card}</li>
      ))}
    </ul>
  );
};

/**************************************/
export default CardsDeck;
