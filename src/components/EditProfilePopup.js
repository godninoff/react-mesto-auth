import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    return(
        <PopupWithForm name="popup_edit" title="Редактировать профиль" buttonSaveText="Сохранить" isOpen={props.isOpen} onClose={props.onClose}>
            <input required className="popup__input popup__input_type_name" name="name" id="name-input" type="text" minLength="2" maxLength="40" placeholder="Имя" />
            <span className="popup__form-error name-input-error"></span>
            <input required className="popup__input popup__input_type_description" name="description" id="description-input" type="text" minLength="2" maxLength="200" placeholder="Вид деятельности" />
            <span className="popup__form-error description-input-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup