import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Stack, Typography, Card } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getPokemonList } from '../../store/pokemon-page/thunks';
import Preloader from '../../components/Preloader/Preloader';
import './styles.sass';

const POKEMON_LIMIT_ON_PAGE = 20;

const Home: FC = () => {
    const [page, setPage] = useState(1);

    const { pokemonPage } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        const getPokemonListParams = {
            offset: page * POKEMON_LIMIT_ON_PAGE - POKEMON_LIMIT_ON_PAGE,
            limit: POKEMON_LIMIT_ON_PAGE,
        }
        dispatch(getPokemonList(getPokemonListParams));
    }, [page]);

    return (
        <div className="home-page">
            <Typography variant="h1">Pokemon List</Typography>

            {pokemonPage.page && pokemonPage.page.results.length > 0 && (
                <ul className="list">
                    {pokemonPage.page.results.map((pokemon) => (
                        <li key={pokemon.url}>
                            <Card>
                                <Link to={pokemon.name} className="card">{pokemon.name}</Link>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}

            {pokemonPage.page?.count && pokemonPage.page.count > 0 && (
                <Stack>
                    <Pagination
                        page={page}
                        count={Math.ceil(pokemonPage.page?.count / POKEMON_LIMIT_ON_PAGE)}
                        boundaryCount={2}
                        showFirstButton
                        showLastButton
                        onChange={handleChangePage}
                    />
                </Stack>
            )}

            {pokemonPage.isLoading && <Preloader />}
        </div>
    );
};

export default Home;
