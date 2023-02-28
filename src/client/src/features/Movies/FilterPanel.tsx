import { Paper, Typography } from '@mui/material';
import React from 'react'
import CustomFilterInput from '../../app/components/CustomFilterInput';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { searchMoviesAsync, setSearchParams } from './moviesSlice';

const FilterPanel = () => {

    const dispatch = useAppDispatch();
    const { searchParams } = useAppSelector(state => state.movies);

    const typeOptions = [
        { value: 'movie', label: 'Movie' },
        { value: 'series', label: 'Series' },
        { value: 'episode', label: 'Episode' },
        { value: 'game', label: 'Game' },
    ]

    const triggerSearch = () => {
        dispatch(searchMoviesAsync());
    }

    const handleYear = (e: any) => {
        if (e.target.value > 1500) {
            console.log("Year: " + e.target.value);
            dispatch(setSearchParams({ year: e.target.value }));
            triggerSearch();
        }
    }

    return (
        <>
            <Paper sx={{ mb: 2, p: 2 }}>
                <Typography variant='h6' component="div">
                    Filters
                </Typography>
            </Paper>
            <Paper sx={{ mb: 2, p: 2 }}>
                <RadioButtonGroup
                    label="Type"
                    options={typeOptions}
                    onChange={(e) => {
                        dispatch(setSearchParams({ type: e.target.value }));
                        triggerSearch();
                    }}
                    selectedValue={searchParams.type} />
            </Paper>
            <Paper sx={{ mb: 2, p: 2 }}>
                <CustomFilterInput
                    label='Search Year'
                    defaultValue={searchParams.year}
                    onChange={handleYear} />
            </Paper>
        </>
    )
}

export default FilterPanel;