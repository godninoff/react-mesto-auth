import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import RemoveCardRequestPopup from './RemoveCardRequestPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(), 
            api.getInitialCards()
        ])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            }).catch((e) => console.log(e));
    },[]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((e) => console.log(e));
    }

    function handleCardRemove(card) {
        api.removeCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
    }

    function handleUpdateUser({name, about}) {
        api.setUserInfo(name, about)
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch((e) => console.log(e));   
    }

    function handleUpdateAvatar(avatarData) {
        api.setUserAvatar(avatarData)
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups(); 
        }).catch((e) => console.log(e));
    }

    function handleAddPlaceSubmit(name, link) {
        api.createCard(name, link)
        .then((res) => {
            setCards([res, ...cards]);
            closeAllPopups();  
        }).catch((e) => console.log(e));
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

  return (
    
    <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
            <Header />  
            <Main onCardDelete={handleCardRemove} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} cards={cards} />  
            <EditProfilePopup onUpdateUser={handleUpdateUser}  isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <RemoveCardRequestPopup />
            <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
            <Footer /> 
        </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;
