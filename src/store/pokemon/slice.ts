import { createSlice } from '@reduxjs/toolkit';
import { IPokemonPage } from '../../models/pokemon';
import { getPokemonList } from './thunks';

interface IPokemonState {
    pokemonPage: IPokemonPage | null
    isLoading: boolean;
    error: string | null;
}

const initialState: IPokemonState = {
    pokemonPage: null,
    isLoading: false,
    error: null,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemonList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPokemonList.rejected, () => {})
            .addCase(getPokemonList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pokemonPage = action.payload;
            });
    },
});

export default pokemonSlice.reducer;
