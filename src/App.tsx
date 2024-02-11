import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hook';
import { getPokemonList } from './store/pokemon/thunks';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);

    console.log('state: ', state);

    useEffect(() => {
        dispatch(getPokemonList());
    }, []);

    return (
        <div>
            Get Win
        </div>
    );
}

export default App;
