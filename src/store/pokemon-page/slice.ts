import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IName, IPokemonPage, IType } from '../../models/pokemon';
import { getPokemonList, getPokemonByType, getPokemonTypes } from './thunks';

interface IPokemonState {
    page: IPokemonPage | null
    isLoading: boolean;
    error: string | null;
    type: IType['type']['name'];
    types: IName[];
}

const initialState: IPokemonState = {
    page: null,
    isLoading: false,
    error: null,
    type: 'all',
    types: [],
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addPokemonType(state, action: PayloadAction<Partial<IType['type']['name']>>) {
            state.type = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPokemonList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPokemonList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(getPokemonList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.page = action.payload;
            })
            .addCase(getPokemonByType.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPokemonByType.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(getPokemonByType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.page = { results: action.payload };
            })
            .addCase(getPokemonTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPokemonTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(getPokemonTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.types = action.payload;
            });
    },
});

export const { addPokemonType } = pokemonSlice.actions;
export default pokemonSlice.reducer;
