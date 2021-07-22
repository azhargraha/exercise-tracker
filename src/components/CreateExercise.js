import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import gsap from 'gsap';

import './Components.scss';
import 'react-datepicker/dist/react-datepicker.css';

const CreateExercise = () => {
    const heading = useRef();
    const forms = useRef();
    const [users, setUsers] = useState([]);
    const initialLog = {
        username: 'default',
        description: '',
        duration: '',
        date: new Date()
    };
    const [logData, setLogData] = useState(initialLog);
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
        axios.get('http://localhost:5000/users/')
        .then(res => setUsers(res.data))

        gsap.from(heading.current.childNodes, fadeInUp);
        gsap.from(forms.current.childNodes, {
            ...fadeInUp,
            delay: .7
        });
    }, []);

    const titleCase = (text) => {
        return text.replace(
            /\w\S*/g,
            function(str) {
                return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
            }
        );
    }

    const onSubmit = (e) => {
        console.log(initialLog === logData)
        e.preventDefault();
        axios.post('http://localhost:5000/exercises/add', logData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        setLogData(initialLog);
    }

    const onChangeSelect = (e) => {
        setLogData({
            ...logData,
            username: e.target.value
        });
    }

    const onChangeDesc = (e) => {
        setLogData({
            ...logData,
            description: e.target.value
        });
    }

    const onChangeDuration = (e) => {
        setLogData({
            ...logData,
            duration: e.target.value
        });
    }
    
    const onChangeDate = (e) => {
        setLogData({
            ...logData,
            date: e
        });
    }

    return (
        <form className="content-container">
            <div className="heading" ref={heading}>
                <h3>Create new exercise log</h3>
                <p>An exercise log keeps track of what you do, allowing you to see patterns in case you are not meeting your exercise requirements. If you notice you always skip your Friday routine. Best of all, your log lets you see your progress and accomplishments.</p>
            </div>
            <div className="form-wrapper" ref={forms}>
                <div className="forms">
                    <h4>Name</h4>
                    <select onChange={onChangeSelect} value={logData.username} className="dropdown" name="user name" id="" required>
                        <option value="default" hidden disabled>Select user name</option>
                        {users.map(user => {return <option key={user._id} value={user.username}>{user.username}</option>})}
                    </select>
                    <div className="dropicon"></div>
                </div>
                <div className="forms">
                    <h4>Description</h4>
                    <input onChange={onChangeDesc} value={logData.description} className="textInput" spellCheck="false" autoComplete="off" type="text" placeholder="Enter exercise description" name="Description" id="" required/>
                </div>
                <div className="short-forms">
                    <div className="forms" id="duration">
                        <h4>Duration</h4>
                        <input onChange={onChangeDuration} value={logData.duration} className="textInput" spellCheck="false" autoComplete="off" type="number" placeholder="Enter duration" name="Duration" id="" required/>
                    </div>
                    <div className="forms" id="date">
                        <h4>Date</h4>
                        <DatePicker
                        onChange={onChangeDate}
                        onChangeRaw={e => e.preventDefault()}
                        className="DatePicker" 
                        selected={logData.date}
                        placeholderText="Pick a date"
                        onChange={onChangeDate}
                        maxDate={new Date()}
                        required
                        />
                    </div>
                </div>
            </div>
            <button onClick={onSubmit} className="submit-button" type="submit">Submit</button>
        </form>
    )
};

export default CreateExercise;
