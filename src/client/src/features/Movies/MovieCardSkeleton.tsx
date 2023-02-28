import { Grid, Card, CardContent, Typography, CardActions, Skeleton } from '@mui/material';

const MovieCardSkeleton = () => {
    return (
        <Grid container component={Card} sx={{ width: 570 }}>
            <Grid item xs={3}>
                <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
            <Grid item xs={9}>
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Skeleton animation="wave" height={10} width='40%' />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Skeleton animation="wave" height={10} width='40%' />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Skeleton animation="wave" height={10} width='40%' />
                    <Skeleton animation="wave" height={10} width="20%" />
                </CardActions>
            </Grid>
        </Grid>
    )
}

export default MovieCardSkeleton;