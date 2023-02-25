import { DarkMode, LightMode } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import CustomSearchInput from '../components/CustomSearchInput';

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}



const Header = ({ darkMode, handleThemeChange }: Props) => {
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6'
                        sx={navStyles}>
                        Movie Catalog
                    </Typography>
                </Box>
                <CustomSearchInput />
                <Box display='flex' alignItems='center'>
                    <IconButton onClick={handleThemeChange}>
                        {darkMode ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;