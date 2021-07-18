import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Components.scss';

const Navbar = () => {
    const [active, setActive] = useState(0);
    const menusOnclick = (i) => {
        setActive(i);
    };

    return (
        <div className="navbar-container">
            <div className="logo">
                <h1>EXERCISE </h1>
                <h1>LOG.</h1>
            </div>
            <ul className="navMenus-container">
                <li>
                    <Link onClick={ e => menusOnclick(0)} 
                    to="/" 
                    className={active === 0 ? "active" : null}>
                        Exercise Lists
                    </Link>
                </li>
                <li>
                    <Link onClick={ e => menusOnclick(1)} 
                    to="/create" 
                    className={active === 1 ? "active" : null}>
                        Create Exercise
                    </Link>
                </li>
                <li>
                    <Link onClick={ e => menusOnclick(2)} 
                    to="/user" 
                    className={active === 2 ? "active" : null}>
                        Create User
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default Navbar;
