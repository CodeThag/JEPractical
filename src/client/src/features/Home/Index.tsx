import { Paper, Typography } from '@mui/material';
import React from 'react'

const HomePage = () => {
    return (
        <Paper sx={{ mb: 2, p: 4 }}>
            <header className="App-header">
                <Typography variant='h2'>
                    Welcome to our movie database
                </Typography>
            </header>
        </Paper>
    )
}

export default HomePage;