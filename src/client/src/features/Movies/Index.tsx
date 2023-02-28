import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomPagination from '../../app/components/CustomPagination';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import FilterPanel from './FilterPanel';
import MoviesList from './MoviesList';
import { searchMoviesAsync, setPageNumber, setSearchParams } from './moviesSlice';
import PreviousSearchPanel from './PreviousSearchPanel';

const MoviesPage = () => {
    const { movies, previousSearch, paginator, moviesLoaded } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    const params = useParams<{ query: string }>();

    useEffect(() => {
        if (params !== undefined) {
            dispatch(setSearchParams({ query: params.query }));
            dispatch(searchMoviesAsync());
        }
    }, [params, dispatch]);

    useEffect(() => {
        if (!moviesLoaded) dispatch(searchMoviesAsync());
    }, [moviesLoaded, dispatch]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <FilterPanel />
            </Grid>
            <Grid item xs={6}>
                <MoviesList movies={movies} />
            </Grid>
            <Grid item xs={3}>
                <PreviousSearchPanel search={previousSearch} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={6} sx={{ mb: 2 }}>
                {(paginator && movies.length > 0) &&
                    <CustomPagination
                        paginationData={paginator}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))} />}
            </Grid>
            <Grid item xs={3} />
        </Grid>
    )
}

export default MoviesPage;