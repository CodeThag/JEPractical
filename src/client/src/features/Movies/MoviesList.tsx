import { Paper, Stack } from '@mui/material';
import React from 'react'
import LoadingComponent from '../../app/components/LoadingComponent';
import { Movie } from '../../app/models/Movie';
import { useAppSelector } from '../../app/store/configureStore';
import MovieCard from './MovieCard';
import NoMovieList from './NoMovieList';

interface Props {
    movies: Movie[];
}

const MoviesList = ({ movies }: Props) => {
    const { status } = useAppSelector(state => state.movies);
    if (status === 'pendingFetchMovies') return <LoadingComponent />

    return (
        <>
            {movies.length > 0 ?
                (<Stack spacing={2}>
                    {movies.map(movie => (
                        <Paper key={movie.imdbID}>
                            <MovieCard movie={movie} />
                        </Paper>
                    ))}
                </Stack>) : (<NoMovieList />)}
        </>
    )
}

export default MoviesList;