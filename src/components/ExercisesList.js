import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

import './Components.scss';

const ExercisesList = () => {
    const [listData, setListData] = useState([]);
    const [dataExist, setdataExist] = useState(false);
    const heading = useRef();
    const lists = useRef();
    const fadeInUp = {
        y: 10,
        opacity: 0,
        ease: 'Power3.easeOut',
        delay: .5,
        stagger: {
            amount: .1
        }
    }

    useEffect(() => {
        gsap.from(heading.current.childNodes, fadeInUp);
    }, []);

    useEffect(() => {
        if (dataExist) {
            gsap.from(lists.current.childNodes, {
                ...fadeInUp,
                y: '2em',
                duration: .85,
                ease: 'Power3.easeOut',
                stagger: {
                    each: .08
                }
            })
        }
    }, [dataExist]);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get('http://localhost:5000/exercises/', {
            cancelToken: source.token
        })
            .then(res => {
                setListData(res.data);
                setdataExist(true);
            })
            .catch(err => {
                setdataExist(false);
                if (axios.isCancel(err)) {
                    console.log(err)
                }
            })
        return () => {
            source.cancel();
        }
    }, [listData.length]);
        
    const onDelete = (id, i) => {
        gsap.to(lists.current.childNodes[i], {
            keyframes: [
                {opacity: 0, duration: .5},
                {height: 0, duration: .3, delay: -.1}
            ], ease: 'Power3.easeOut'});

        setTimeout(() => {            
            axios.delete(`http://localhost:5000/exercises/${id}`)
                .then(res => console.log(res.data))
                .then(res => setListData(listData.filter(data => data._id !== id)))
        }, 800);
    };

    return (
        <div className="content-container">
            <div className="heading heading-extra" ref={heading}>
                <h3>Exercise lists</h3>
                <p>Here are the list of exercises you've been created.</p>
            </div>
            <div className="list-container" ref={lists}>
                {listData.map((data, i) => {
                    return (
                        <div key={data._id} className="log">
                            <div className="upper-line row">
                                <h3>{data.username}</h3>
                                <button onClick={e => onDelete(data._id, i)} to="/"></button>
                            </div>
                            <div className="bottom-line row" style={{marginBottom: listData[i + 1] ? '1em' : '0'}}>
                                <div id="desc">
                                    <p className="p-title">Description</p>
                                    <p>{data.description}</p>
                                </div>
                                <div className="duration">
                                    <p className="p-title">Duration</p>
                                    <p>{data.duration} minute(s)</p>
                                </div>
                                <div className="date">
                                    <p className="p-title">Date</p>
                                    <p>{data.date}</p>
                                </div>
                                <Link to={`/edit/${data._id}`}>edit</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default ExercisesList;
