import { Paper, IconButton, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../store/configureStore';
import { resetFilter } from '../../features/Movies/moviesSlice';

const CustomSearchInput = () => {
    const dispatch = useAppDispatch();
    const params = useParams<{ query: string }>();
    const [query, setQuery] = useState<string>(); //TODO:  refactor with useRef

    const navigate = useNavigate();

    const handleQueryChange = (e: any) => {
        setQuery(e.target.value);
    }

    const handleSearch = () => {
        console.log(query);
        dispatch(resetFilter());
        if (query !== undefined)
            navigate(`/movies/search/${query}`);
    }

    const onLoad = () => {
        setQuery(params.query);
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
        >
            <InputBase
                value={query}
                onLoad={onLoad}
                onChange={handleQueryChange}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for movies"
                inputProps={{ 'aria-label': 'search for movies' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default CustomSearchInput;