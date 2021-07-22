import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import gsap from 'gsap';

import './Components.scss';

const CreateUser = () => {
    const heading = useRef();
    const forms = useRef();
    const fadeInUp = {
        y: 10,
        opacity: 0,
        ease: 'Power3.easeOut',
        delay: .3,
        stagger: {
            each: .2
        }
    }

    useEffect(() => {
        gsap.from(heading.current.childNodes, fadeInUp);
        gsap.from(forms.current.childNodes, {
            ...fadeInUp,
            delay: .7
        });
    }, []);

    const [user, setUser] = useState({
        username: ''
    });

    const onChangeUser = (e) => {
        setUser({
            username: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
        setUser({
            username: ''
        });
    }

    return (
        <form className="content-container">
            <div className="heading" ref={heading}>
                <h3>Create new user</h3>
                <p>A user account is an identity created for a person in a computer or computing system. User accounts can also be created for machine entities, such as service accounts for running programs, system accounts for storing system files and processes, and root and administrator accounts for system administration.</p>
            </div>
            <div className="form-wrapper" ref={forms}>
                <div className="forms">
                    <h4>User name</h4>
                    <input onChange={onChangeUser} value={user.username} spellCheck="false" autoComplete="off" type="text" placeholder="Enter user name" name="user name" id="" required/>
                </div>
            </div>
            <button className="submit-button" type="submit" onClick={onSubmit}>Submit</button>
        </form>
    )
};

export default CreateUser;
