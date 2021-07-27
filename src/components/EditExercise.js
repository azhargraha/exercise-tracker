import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import gsap from 'gsap';

import './Components.scss';
import 'react-datepicker/dist/react-datepicker.css';

const EditExercise = (props) => {
    const heading = useRef();
    const forms = useRef();
    const { id } = useParams();
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [logData, setLogData] = useState({
        username: 'default',
        description: '',
        duration: '',
        date: new Date()
    });

    useEffect(() => {
        const fadeInUp = {
            y: 10,
            opacity: 0,
            ease: 'Power3.easeOut',
            delay: .3,
            stagger: {
                each: .2
            }
        }
        
        gsap.from(heading.current.childNodes, fadeInUp);
        gsap.from(forms.current.childNodes, {
            ...fadeInUp,
            delay: .6
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/exercises/${id}`)
            .then(res => setLogData({
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration,
                date: res.data.duration
            }))

        axios.get('http://localhost:5000/users/')
            .then(res => setUsers(res.data))

        return () => {
            console.log('edit')
        }
    }, [id]);

    const onUpdate = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/exercises/update/${id}`, logData)
            .then(res => history.push('/'))
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
            <button onClick={onUpdate} className="submit-button" type="submit">Update</button>
        </form>
    )
};

export default EditExercise;
