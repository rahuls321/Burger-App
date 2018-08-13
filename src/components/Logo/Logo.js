import React from 'react';


import BurgerLogo from '../../assests/images/burgerLogo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <a href="/Burger-App/">
            <img src={BurgerLogo} alt= "MyBurger" />
        </a>
    </div>
);

export default logo;
