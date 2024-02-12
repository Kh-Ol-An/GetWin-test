import { configureStore } from '@reduxjs/toolkit';
import pokemonPageReducer from './pokemon-page/slice';
import pokemonDetailReducer from './pokemon-detail/slice';

const store = configureStore({
    reducer: {
        pokemonPage: pokemonPageReducer,
        pokemonDetail: pokemonDetailReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
