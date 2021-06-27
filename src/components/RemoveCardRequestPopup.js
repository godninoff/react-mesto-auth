import React from 'react';
import PopupWithForm from './PopupWithForm';

function RemoveCardRequestPopup(props) {
    return(
        <PopupWithForm name="popup_confirm" title="Вы уверены?" buttonSaveText="Да" isOpen={props.isOpen} onClose={props.onClose}>
           
        </PopupWithForm>
    )
}
export default RemoveCardRequestPopup