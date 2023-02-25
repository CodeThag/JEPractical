import { Grid, Typography } from '@mui/material';
import SearchList from './SearchList';
import { movieList } from './testData';

const SearchPage = () => {
    const movies = movieList
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                Filters
            </Grid>
            <Grid item xs={6}>
                <div>

                </div>
                <SearchList movies={movies} />
            </Grid>
            <Grid item xs={3}>
                <Typography>
                    Previous Search
                </Typography>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{ mb: 2 }}>
                {/* {metaData &&
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))} />} */}
            </Grid>
        </Grid>
    )
}

export default SearchPage;