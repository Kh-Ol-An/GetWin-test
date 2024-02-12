import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Pokemon from './pages/Pokemon/Pokemon';

const App: FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:name" element={<Pokemon />} />
        </Routes>
    );
}

export default App;
