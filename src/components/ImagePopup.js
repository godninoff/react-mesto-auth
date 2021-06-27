import React from 'react';

function ImagePopup(props) {
    return(
        <div className={`popup ${props.isOpen ? "popup_visible" : ""}`}>
        <div className="popup__opened">
            <button className="popup__close-button popup__close-button_card-open" type="button" onClick={props.onClose}>&times;</button>
            <img className="popup__image" alt="#" src="#"/>
            <p className="popup__caption"></p>
        </div>
    </div>
    )
}
export default ImagePopup