import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    return(
    <PopupWithForm name="popup_add-card" title="Новое место" buttonSaveText="Создать" isOpen={props.isOpen} onClose={props.onClose}>
        <input required className="popup__input popup__input_type_name-element" name="name" id="place-input" type="text" minLength="2" maxLength="30" placeholder="Название" />
        <span className="popup__form-error place-input-error"></span>
        <input required className="popup__input popup__input_type_link" name="link" id="url-input" type="url" placeholder="Ссылка на картинку" />
        <span className="popup__form-error url-input-error"></span>
    </PopupWithForm>  
    )
}
export default AddPlacePopup