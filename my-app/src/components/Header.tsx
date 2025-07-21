import React from "react";
import '../styles/header_styles.scss';
import userIcon from '../images/ui/user_icon.png';
export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__content-wrap">
                <span className="header__content-title">Каталог</span>
                <div className="header__content-link-wrap">
                    <a className="header__content-link">Сравнение</a>
                    <a className="header__content-link">Личный кабинет</a>
                    <img className="header__user-icon" src={userIcon}></img>
                </div>
            </div>
        </header>
    );
}