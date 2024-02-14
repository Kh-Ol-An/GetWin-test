import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Pagination,
    Stack,
    Typography,
    Card,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    MenuItem,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getPokemonList, getPokemonByType, getPokemonTypes } from '../../store/pokemon-page/thunks';
import { addPokemonType } from '../../store/pokemon-page/slice';
import Preloader from '../../components/Preloader/Preloader';
import './styles.sass';

const POKEMON_LIMIT_ON_PAGE = 20;

const Home: FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const navigate = useNavigate();

    const pokemonPage = useAppSelector((state) => state.pokemonPage);

    const dispatch = useAppDispatch();

    const handleSearch = () => {
        navigate(`/GetWin-test/${search.toLowerCase()}`)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChangeType = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setType(value);
        dispatch(addPokemonType(value));
    };

    const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (pokemonPage.type.length > 0 && pokemonPage.type !== 'all') {
            dispatch(getPokemonByType(pokemonPage.type));
            setType(pokemonPage.type);
        } else {
            const getPokemonListParams = {
                offset: page * POKEMON_LIMIT_ON_PAGE - POKEMON_LIMIT_ON_PAGE,
                limit: POKEMON_LIMIT_ON_PAGE,
            };
            dispatch(getPokemonList(getPokemonListParams));
        }
    }, [page, pokemonPage.type]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        dispatch(getPokemonTypes())

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="home-page">
            <Typography className="title" variant="h1">Pokemon List</Typography>

            <div className="actions">
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="new-password-search">Search</InputLabel>
                    <OutlinedInput
                        id="new-password-search"
                        type="text"
                        label="Search"
                        autoComplete="new-password-search"
                        value={search}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={handleSearch}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type}
                        label="Type"
                        onChange={handleChangeType}
                    >
                        <MenuItem value='all'>All Pokemon</MenuItem>
                        {pokemonPage.types.map((type) => (
                            <MenuItem key={type.name} value={type.name}>{type.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {pokemonPage.page && pokemonPage.page.results.length > 0 && (
                <ul className="list">
                    {pokemonPage.page.results.map((pokemon) => (
                        <li key={pokemon.name}>
                            <Card className="card">
                                <Link to={`/GetWin-test/${pokemon.name}`} className="link">
                                    <img
                                        src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
                                        alt={`pokemon-${pokemon.name}`}
                                    />
                                    <span>{pokemon.name}</span>
                                </Link>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}

            {(pokemonPage.type.length === 0 || pokemonPage.type === 'all') &&
                pokemonPage.page?.count &&
                pokemonPage.page.count > 0 && (
                    <Stack>
                        <Pagination
                            page={page}
                            count={Math.ceil(pokemonPage.page?.count / POKEMON_LIMIT_ON_PAGE)}
                            boundaryCount={windowWidth > 767 ? 2 : 1}
                            siblingCount={windowWidth > 767 ? 1 : 0}
                            showFirstButton={windowWidth > 767}
                            showLastButton={windowWidth > 767}
                            onChange={handleChangePage}
                        />
                    </Stack>
                )}

            {pokemonPage.isLoading && <Preloader />}
        </div>
    );
};

export default Home;
