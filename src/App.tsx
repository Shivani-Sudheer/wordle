import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import GamePage from './containers/game-page/GamePage';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
        <Suspense fallback={<div>Loading...</div>}>
           <Route path="/" element={<GamePage/>}/>
        </Suspense>
           </Routes>
        </Router>
    </div>
  );
}

export default App;
