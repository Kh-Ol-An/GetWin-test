import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { IGetPokemonListParams, IName, IPokemonByType, IPokemonPage, IType } from '../../models/pokemon';

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

export const getPokemonByType = createAsyncThunk<IPokemonPage['results'], IType['type']['name']>(
    'pokemon/getPokemonByType',
    async (type) => {
        const result = await api.get(`/type/${type}`);

        return result.data.pokemon.map((item: IPokemonByType) => ({
            name: item.pokemon.name,
        }));
    },
);

export const getPokemonTypes = createAsyncThunk<IName[], void>(
    'pokemon/getPokemonTypes',
    async () => {
        const result = await api.get('/type');

        return result.data.results;
    },
);
