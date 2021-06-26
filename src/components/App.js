import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';


function App() {
  return (
    <div className="root">
        <Header />  
        <Main />  
          <div className="popup popup_edit">
              <div className="popup__container">
                  <button className="popup__close-button" type="button">&times;</button>
                  <h2 className="popup__title">Редактировать профиль</h2>
                  <form className="popup__form" name="form" id="form-profile" noValidate autoComplete="off">
                      <input required className="popup__input popup__input_type_name" name="name" id="name-input" type="text" minLength="2" maxLength="40" placeholder="Имя"/>
                      <span className="popup__form-error name-input-error"></span>
                      <input required className="popup__input popup__input_type_description" name="description" id="description-input" type="text" minLength="2" maxLength="200" placeholder="Вид деятельности"/>
                      <span className="popup__form-error description-input-error"></span>
                      <button className="popup__save-button" type="submit" disabled>Сохранить</button>
                  </form>
              </div>
          </div>
          <div className="popup popup_add-card">
              <div className="popup__container">
                  <button className="popup__close-button popup__close-button_card" type="button">&times;</button>
                  <h2 className="popup__title">Новое место</h2>
                  <form className="popup__form" name="form" noValidate autoComplete="off">
                      <input required className="popup__input popup__input_type_name-element" name="name" id="place-input" type="text" minLength="2" maxLength="30" placeholder="Название"/>
                      <span className="popup__form-error place-input-error"></span>
                      <input required className="popup__input popup__input_type_link" name="link" id="url-input" type="url" placeholder="Ссылка на картинку"/>
                      <span className="popup__form-error url-input-error"></span>
                      <button className="popup__save-button popup__save-button_inactive" type="submit" disabled>Создать</button>
                  </form>
              </div>
          </div>
          <div className="popup popup_confirm">
              <div className="popup__container">
                  <button className="popup__close-button" type="button">&times;</button>
                  <h2 className="popup__title">Вы уверены?</h2>
                  <form className="popup__form" name="form" noValidate>
                      <button className="popup__save-button" type="submit">Да</button>
                  </form>
              </div>
          </div>
          <div className="popup popup_update-avatar">
              <div className="popup__container">
                  <button className="popup__close-button" type="button">&times;</button>
                  <h2 className="popup__title">Обновить аватар</h2>
                  <form className="popup__form" name="form" id="form-avatar-profile" noValidate>
                      <input required className="popup__input popup__input_type_avatar-link" name="avatar" id="avatar-input" type="url" placeholder="Ссылка на новый аватар"/>
                      <span className="popup__form-error avatar-input-error"></span>
                      <button className="popup__save-button" type="submit" disabled>Сохранить</button>
                  </form>
              </div>
          </div>
          <div className="popup popup_card-open">
              <div className="popup__opened">
                  <button className="popup__close-button popup__close-button_card-open" type="button">&times;</button>
                  <img className="popup__image" alt="#" src="#"/>
                  <p className="popup__caption"></p>
              </div>
          </div>
          <Footer /> 
    </div>
  );
}

export default App;
