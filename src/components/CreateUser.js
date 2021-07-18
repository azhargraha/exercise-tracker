import React from 'react';

import './Components.scss';

const CreateUser = () => {
    return (
        <div className="content-container">
            <div className="heading">
                <h3>Create new user</h3>
                <p>A user account is an identity created for a person in a computer or computing system. User accounts can also be created for machine entities, such as service accounts for running programs, system accounts for storing system files and processes, and root and administrator accounts for system administration.</p>
            </div>
            <div className="form-wrapper">
                <div className="forms">
                    <h4>User name</h4>
                    <input spellCheck="false" autoComplete="off" type="text" placeholder="Enter user name" name="user name" id="" />
                </div>
            </div>
            <button className="submit-button">Submit</button>
        </div>
    )
};

export default CreateUser;
