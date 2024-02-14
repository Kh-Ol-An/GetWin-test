import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, IconButton, CardContent, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPokemon } from '../../store/pokemon-detail/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import './styles.sass';
import Preloader from '../../components/Preloader/Preloader';
import { IType } from '../../models/pokemon';
import { addPokemonType } from '../../store/pokemon-page/slice';

const Pokemon: FC = () => {
    const { name } = useParams<{ name: string }>();

    const pokemonDetail = useAppSelector((state) => state.pokemonDetail);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleChooseType = async (type: IType['type']['name']) => {
        await dispatch(addPokemonType(type));
        navigate('/GetWin-test');
    };

    useEffect(() => {
        dispatch(getPokemon(name));
    }, [name]);

    return (
        <div className="pokemon-page">
            {pokemonDetail.detail ? (
                <Card className="card">
                    <IconButton className="back" onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </IconButton>

                    <CardContent className="content">
                        <div className="head">
                            <img
                                src={pokemonDetail.detail.sprites.other.dream_world.front_default}
                                alt={pokemonDetail.detail.name}
                            />
                            <div>
                                <Typography variant="h1" className="title">
                                    {pokemonDetail.detail.name}
                                </Typography>

                                {pokemonDetail.detail.types.length > 0 && (
                                    <div className="head-content">
                                        <Typography variant="h3" className="sub-title">
                                            Types:
                                        </Typography>

                                        <ul className="type-list">
                                            {pokemonDetail.detail.types.map((type, i) => (
                                                <li key={type.type.name + i} className="text">
                                                    <Button onClick={() => handleChooseType(type.type.name)}>
                                                        {type.type.name}
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="body">
                            <Typography variant="h3" className="sub-title">
                                Moves:
                            </Typography>

                            {pokemonDetail.detail.moves.length > 0 && (
                                <ul className="move-list">
                                    {pokemonDetail.detail.moves.map((move, i) => (
                                        <li key={move.move.name + i} className="text">{move.move.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="content">
                    <IconButton className="back" onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h1" className="title">
                        Pokemon not found
                    </Typography>
                    <Typography color="red">
                        Error: {pokemonDetail.error}
                    </Typography>
                </div>
            )}

            {pokemonDetail.isLoading && <Preloader />}
        </div>
    );
};

export default Pokemon;
