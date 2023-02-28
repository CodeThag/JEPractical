import { Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { PreviousSearch } from '../../app/models/PreviousSearch'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchPreviousSearchAsync } from './moviesSlice';


interface Props {
    search: PreviousSearch[];
}

const PreviousSearchPanel = ({ search }: Props) => {
    const { previousSearchLoaded, previousSearch } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!previousSearchLoaded) dispatch(fetchPreviousSearchAsync());
    });

    return (
        <>
            <Paper sx={{ mb: 2, p: 2 }}>
                <Typography variant='h6' component="div">
                    Saved Search
                </Typography>
            </Paper>
            {previousSearch.length > 0 ? (
                <Paper sx={{ mb: 2, p: 2 }}>
                    {previousSearch.map(s => (
                        <Link to={`/movies/search/${s.keyword}`}>
                            <Typography key={s.id} variant='body1'>
                                {s.keyword}
                            </Typography>
                        </Link>
                    ))}
                </Paper>) : (
                <Paper sx={{ mb: 2, p: 2 }}>
                    <Typography variant='body2'>No search history</Typography>
                </Paper>
            )}
        </>
    )
}

export default PreviousSearchPanel;