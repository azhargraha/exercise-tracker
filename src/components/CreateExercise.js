import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import './Components.scss';
import 'react-datepicker/dist/react-datepicker.css';

const CreateExercise = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <div className="content-container">
            <div className="heading">
                <h3>Create new exercise log</h3>
                <p>An exercise log keeps track of what you do, allowing you to see patterns in case you are not meeting your exercise requirements. If you notice you always skip your Friday routine. Best of all, your log lets you see your progress and accomplishments.</p>
            </div>
            <div className="form-wrapper">
                <div className="forms">
                    <h4>Name</h4>
                    <select className="dropdown" name="user name" id="">
                        <option value="placeholder" selected hidden disabled>Select user name</option>
                        <option value="tatang">Tatang</option>
                        <option value="asep">Asep</option>
                    </select>
                    <div className="dropicon"></div>
                </div>
                <div className="forms">
                    <h4>Description</h4>
                    <input className="textInput" spellCheck="false" autoComplete="off" type="text" placeholder="Enter exercise description" name="Description" id="" />
                </div>
                <div className="short-forms">
                    <div className="forms" id="duration">
                        <h4>Duration</h4>
                        <input className="textInput" spellCheck="false" autoComplete="off" type="text" placeholder="Enter duration" name="Duration" id="" />
                    </div>
                    <div className="forms" id="date">
                        <h4>Date</h4>
                        <DatePicker
                        onChangeRaw={e => e.preventDefault()}
                        className="DatePicker" 
                        selected={selectedDate}
                        placeholderText="Pick a date"
                        onChange={date => setSelectedDate(date)}
                        maxDate={new Date()}
                        />
                    </div>
                </div>
            </div>
            <button className="submit-button">Submit</button>
        </div>
    )
};

export default CreateExercise;
