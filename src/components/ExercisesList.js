import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Components.scss';

const ExercisesList = () => {
    const [listData, setListData] = useState([]);
    
    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get('http://localhost:5000/exercises/', {
            cancelToken: source.token
        })
            .then(res => setListData(res.data))
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log(err.message, "error bos")
                }
            })
        return () => {
            console.log('clean up')
        }
    }, [listData.length]);
        
    const onDelete = (id) => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data))
            .then(res => setListData(listData.filter(data => data._id !== id)))
    };

    return (
        <div className="content-container">
            <div className="heading">
                <h3>Exercise lists</h3>
                <p>Here are the list of exercises you've been created.</p>
            </div>
            <div className="list-container">
                {listData.map((data, i) => {
                    return (
                        <div key={data._id} className="log">
                            <div className="upper-line row">
                                <h3>{data.username}</h3>
                                <button onClick={e => onDelete(data._id)} to="/"></button>
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
