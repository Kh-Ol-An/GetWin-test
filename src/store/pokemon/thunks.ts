import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { IPokemonPage } from '../../models/pokemon';

export const getPokemonList = createAsyncThunk<IPokemonPage, void>(
    'pokemon/getPokemonList',
    async () => {
        const result = await api.get('/pokemon');

        return result.data;
    },
);
