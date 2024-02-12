import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { IGetPokemonListParams, IPokemonPage } from '../../models/pokemon';

export const getPokemonList = createAsyncThunk<IPokemonPage, IGetPokemonListParams>(
    'pokemon/getPokemonList',
    async ({ offset, limit }) => {
        const result = await api.get(
            '/pokemon',
            {
                params: {
                    limit,
                    offset,
                },
            },
        );

        return result.data;
    },
);
