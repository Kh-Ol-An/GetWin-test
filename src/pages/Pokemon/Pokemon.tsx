import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, IconButton, CardContent, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPokemon } from '../../store/pokemon-detail/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import './styles.sass';
import Preloader from '../../components/Preloader/Preloader';

const Pokemon: FC = () => {
    const { name } = useParams<{ name: string }>();

    const { pokemonDetail } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPokemon(name));
    }, [name]);

    return (
        <div className='pokemon-page'>
            {pokemonDetail.detail && (
                <Card className='card'>
                    <IconButton className='back' onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </IconButton>

                    <CardContent className='content'>
                        <div className='head'>
                            <img
                                src={pokemonDetail.detail.sprites.other.dream_world.front_default}
                                alt={pokemonDetail.detail.name}
                            />
                            <div>
                                <Typography variant="h1" className='title'>
                                    {pokemonDetail.detail.name}
                                </Typography>

                                {pokemonDetail.detail.types.length > 0 && (
                                    <div className='head-content'>
                                        <Typography variant="h3" className='sub-title'>
                                            Types:
                                        </Typography>

                                        <ul className='type-list'>
                                            {pokemonDetail.detail.types.map((type, i) => (
                                                <li key={type.type.name + i} className='text'>{type.type.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='body'>
                            <Typography variant="h3" className='sub-title'>
                                Moves:
                            </Typography>

                            {pokemonDetail.detail.moves.length > 0 && (
                                <ul className='move-list'>
                                    {pokemonDetail.detail.moves.map((move, i) => (
                                        <li key={move.move.name + i} className='text'>{move.move.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {pokemonDetail.isLoading && <Preloader />}
        </div>
    );
};

export default Pokemon;
