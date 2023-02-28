import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
    message?: string;
}

const LoadingComponent = ({ message = 'Loading...' }: Props) => {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display='flex' justifyContent='top' alignItems='center' height='10vh'>
                <CircularProgress size={70} color='secondary' />
                <Typography variant='h5' sx={{ justifyContent: 'center', position: 'fixed', top: '60%' }}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    )
}

export default LoadingComponent;