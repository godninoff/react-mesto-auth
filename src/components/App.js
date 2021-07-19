import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import {Route, Switch, BrowserRouter, Redirect, useHistory} from 'react-router-dom'; 
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const history = useHistory();
    const [email, setEmail] = React.useState('');

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
        }).catch((e) => console.log(e));
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
        setIsInfoTooltipOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    function handleLogin() {
        setLoggedIn(true);
      }

  return (
    
    <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
            <Header />  
            <BrowserRouter>
            <Switch>
                <ProtectedRoute 
                    exact
                    path="/"
                    component={Main}
                    onCardDelete={handleCardRemove} 
                    onCardLike={handleCardLike} 
                    onCardClick={handleCardClick} 
                    onEditAvatar={handleEditAvatarClick} 
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    cards={cards}
                    loggedIn={loggedIn} 
                />
                <Route path="/sign-up">
                    <Register />
                </Route>
                <Route path="/sign-in">
                    <Login />
                </Route>
            </Switch> 
            </BrowserRouter>
            <EditProfilePopup 
                onUpdateUser={handleUpdateUser}  
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
            />
            <AddPlacePopup 
                onAddPlace={handleAddPlaceSubmit} 
                isOpen={isAddPlacePopupOpen} 
                onClose={closeAllPopups} 
            />
            <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
                onUpdateAvatar={handleUpdateAvatar} 
            />
            <ConfirmPopup />
            <ImagePopup 
                card={selectedCard !== null && selectedCard} 
                onClose={closeAllPopups} 
            />
            <InfoTooltip 
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                message={'Что-то пошло не так! Попробуйте ещё раз.'}
            />

            <Footer /> 
        </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;
