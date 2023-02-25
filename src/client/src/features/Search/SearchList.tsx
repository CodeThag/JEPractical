import { Grid } from '@mui/material';
import React from 'react'
import { Movie } from '../../app/models/Movie';
import MovieCard from './MovieCard';
import MovieListSkeleton from './MovieListSkeleton';

interface Props {
    movies: Movie[];
}

const SearchList = ({ movies }: Props) => {
    return (
        <Grid container spacing={1}>
            {movies.map(movie => (
                <Grid item key={movie.imdbID}>
                    {true ? (<MovieCard movie={movie} />)
                        : (<MovieListSkeleton />)}
                </Grid>
            ))}
        </Grid>
    )
}

export default SearchList;