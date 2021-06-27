import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const [userAvatar, setUserAvatar] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(), 
            api.getInitialCards()
        ])
            .then(([userData, cards]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(cards);
            }).catch((e) => console.log(e));
    },[]);

return(
    <main className="content">
    <section className="profile">
        <div className="profile__avatar-button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя"/>
        </div>    
        <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button type="button" className="profile__button-edit" onClick={props.onEditProfile}></button>
            <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
    </section>

    <section className="elements">
        {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} />
        ))}
    </section>
    </main> 
)
}

export default Main;

