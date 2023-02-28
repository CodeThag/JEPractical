import { Share } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardMedia, CardContent, Typography, CardActions, Grid, IconButton } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { Movie } from '../../app/models/Movie';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    return (
        <Grid container component={Card} sx={{ width: 570 }}>
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
                    <IconButton size="small">
                        <Share />
                    </IconButton>
                    <IconButton size="small" component={Link} to={`/movies/${movie.imdbID}`}>
                        <VisibilityIcon />
                    </IconButton>
                </CardActions>
            </Grid>
        </Grid>
    )
}

export default MovieCard;