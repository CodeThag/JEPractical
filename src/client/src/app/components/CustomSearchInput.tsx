import { Paper, IconButton, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const CustomSearchInput = () => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for movies"
                inputProps={{ 'aria-label': 'search for movies' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default CustomSearchInput;