import React from 'react';
import logo from '../images/logo.svg'
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';

function Header() {
    return(
        <header className="header">
            <img className="header__logo" src={logo} alt="Место"/>
            <BrowserRouter>
            <Switch>
                <Route exact path="/sign-in">
                    <Link className="header__link" to="/sign-up" >
                        Регистрация
                    </Link>
                </Route>
                <Route exact path="/sign-up">
                    <Link className="header__link" to="/sign-in" >
                        Войти
                    </Link>
                </Route>
            </Switch>
            </BrowserRouter>
        </header>
    )
}
export default Header