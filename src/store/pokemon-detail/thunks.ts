import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { IDetailPokemon } from '../../models/pokemon';

export const getPokemon = createAsyncThunk<IDetailPokemon, string | undefined>(
    'pokemon/getPokemon',
    async (name) => {
        const result = await api.get(`/pokemon/${name}`);

        return result.data;
    },
);
