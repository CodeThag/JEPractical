import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../app/components/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchMovieDetailsAsync } from './moviesSlice';


const MovieDetailPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const { movie, movieLoaded } = useAppSelector(state => state.movies);

    useEffect(() => {
        if (!movie || movie.imdbID !== id) dispatch(fetchMovieDetailsAsync(id!));

    }, [id, dispatch, movie, movieLoaded]);

    if (!movieLoaded && movie === undefined) return <LoadingComponent />

    if (movieLoaded && movie === undefined) return <div>Movie not found!</div>

    return (
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <img src={movie?.poster} alt={movie?.title} style={{ width: '100%' }} />
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <Typography variant='h3' component='div'>
                        {movie?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie?.plot}
                    </Typography>
                    <hr />
                    <Typography variant="body2" color="text.secondary">
                        Released: {movie?.released}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Genre: {movie?.genre}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Actors: {movie?.actors}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Directors: {movie?.director}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Writer: {movie?.writer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Language: {movie?.language}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Country: {movie?.country}
                    </Typography>

                </Paper>
            </Grid>
        </Grid>
    )
}

export default MovieDetailPage;