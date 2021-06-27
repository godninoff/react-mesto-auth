import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      }  
    
    return(
        <article className="element">
            <button type="button" className="element__remove"></button>
            <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleClick} /> 
            <div className="element__group">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like-field">
                    <button type="button" className="element__like"></button>  
                    <p className="element__like-counter">{props.card.likes.length}</p>
                </div>    
            </div>
        </article>
    )
}
export default Card