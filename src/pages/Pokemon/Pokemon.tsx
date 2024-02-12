import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { getPokemon } from '../../store/pokemon-detail/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import './styles.sass';

const Pokemon: FC = () => {
    const { name } = useParams<{ name: string }>();

    const { pokemonDetail } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPokemon(name));
    }, [name]);

    return (
        <div className='pokemon-page'>
            {pokemonDetail.detail && (
                <Card className='card'>
                    <CardContent className='content'>
                        <div className='head'>
                            <img
                                src={pokemonDetail.detail.sprites.other.dream_world.front_default}
                                alt={pokemonDetail.detail.name}
                            />
                            <Typography variant="h1" className='title'>
                                {pokemonDetail.detail.name}
                            </Typography>
                        </div>

                        <div className='body'>
                            {pokemonDetail.detail.moves.length > 0 && (
                                <ul className='list'>
                                    {pokemonDetail.detail.moves.map((move, i) => (
                                        <li key={move.move.name + i}>{move.move.name}</li>
                                    ))}
                                </ul>
                            )}

                            {pokemonDetail.detail.types.length > 0 && (
                                <ul className='list'>
                                    {pokemonDetail.detail.types.map((type, i) => (
                                        <li key={type.type.name + i}>{type.type.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Pokemon;
