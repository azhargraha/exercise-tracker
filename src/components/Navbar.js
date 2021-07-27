import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import './Components.scss';

const Navbar = () => {
    const [active, setActive] = useState(null);
    let navbarBg = useRef();
    let navbarBgSc = useRef();
    const navMenus = useRef();
    const logo = useRef();

    
    useEffect(() => {
        const fadeInUp = {
            y: 10,
            opacity: 0,
            ease: 'Power3.easeOut',
            delay: .3,
            stagger: {
                amount: .3
            }
        }
        const activeMenu = sessionStorage.getItem('activeMenu');
        setActive(JSON.parse(activeMenu));
        gsap.from(logo.current.childNodes, {
            ...fadeInUp,
            y: 0,
            x: -20
        });
        gsap.from(navMenus.current.childNodes, {
            ...fadeInUp,
            delay: fadeInUp.delay + .2
        });
        gsap.from([navbarBg, navbarBgSc], {
            flex: 0,
            width: 0,
            transformOrigin: 'right top',
            skewX: -5,
            ease: 'Power3.easeOut',
            duration: 1.5,
            stagger: {
                amount: .2
            }
        });
    }, []);

    const menusOnclick = (i) => {
        setActive(i);
        sessionStorage.setItem('activeMenu', JSON.stringify(i));
    };

    return (
        <div className="navbar">
            <div className="secondary-bg" ref={el => navbarBg = el}></div>
            <div className="navbar-container" ref={el => navbarBgSc = el}>
                <div className="logo" ref={logo}>
                    <h1>EXERCISE </h1>
                    <h1>LOG.</h1>
                </div>
                <ul className="navMenus-container" ref={navMenus}>
                    <li>
                        <Link onClick={ e => menusOnclick(0)} 
                        to="/" 
                        className={active === 0 | active === null ? "active" : null}>
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
        </div>
    )
};

export default Navbar;
