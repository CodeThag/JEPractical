import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import React from 'react'
import { Movie } from '../../app/models/Movie';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    return (
        <Grid container component={Card}>
            <Grid item xs={3}>
                <CardMedia
                    component="img"
                    width="300"
                    image={movie.poster}
                    alt={movie.title}
                />
            </Grid>
            <Grid item xs={9}>
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Year: {movie.year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Type: {movie.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">View</Button>
                </CardActions>
            </Grid>
        </Grid>
    )
}

export default MovieCard;