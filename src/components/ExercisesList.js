import React from 'react';
import { Link } from 'react-router-dom';

import './Components.scss';

const ExercisesList = () => {
    return (
        <div className="content-container">
            <div className="heading">
                <h3>Exercise lists</h3>
                <p>Here are the list of exercises you've been created.</p>
            </div>
            <div className="list-container">
                <div className="log">
                    <div className="upper-line row">
                        <h3>Nama</h3>
                        <Link to="/"></Link>
                    </div>
                    <div className="bottom-line row">
                        <div id="desc">
                            <p className="p-title">Description</p>
                            <p>Exercise</p>
                        </div>
                        <div className="duration">
                            <p className="p-title">Duration</p>
                            <p>1h 5m</p>
                        </div>
                        <div className="date">
                            <p className="p-title">Date</p>
                            <p>21/02/2021</p>
                        </div>
                        <Link to="/">edit</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ExercisesList;
