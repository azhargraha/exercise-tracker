import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact>
        <ExercisesList />
      </Route>
      <Route path="/edit/:id">
        <EditExercise />
      </Route>
      <Route path="/create">
        <CreateExercise />
      </Route>
      <Route path="/user">
        <CreateUser />
      </Route>
    </Router>
  );
}

export default App;
