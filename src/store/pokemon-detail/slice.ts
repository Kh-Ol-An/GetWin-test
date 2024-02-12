import { createSlice } from '@reduxjs/toolkit';
import { IDetailPokemon } from '../../models/pokemon';
import { getPokemon } from './thunks';

interface IPokemonState {
    detail: IDetailPokemon | null
    isLoading: boolean;
    error: string | null;
}

const initialState: IPokemonState = {
    detail: null,
    isLoading: false,
    error: null,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPokemon.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(getPokemon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.detail = action.payload;
            });
    },
});

export default pokemonSlice.reducer;
