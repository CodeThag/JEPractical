import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { agent } from "../../app/api/agent";
import {
  Movie,
  MovieExtended,
  MovieSearchParams,
} from "../../app/models/Movie";
import { PaginationProps } from "../../app/models/pagination";
import { PreviousSearch } from "../../app/models/PreviousSearch";
import { RootState } from "../../app/store/configureStore";

interface MoviesState {
  status: string;
  query?: string;
  moviesLoaded: boolean;
  previousSearch: PreviousSearch[];
  movies: Movie[];
  searchParams: MovieSearchParams;
  previousSearchLoaded: boolean;
  movie?: MovieExtended;
  movieLoaded: boolean;
  paginator: PaginationProps | null;
}

function initParams() {
  return {
    year: undefined,
    type: undefined,
    pageNumber: 1,
  };
}

const initialState: MoviesState = {
  status: "idle",
  moviesLoaded: false,
  previousSearch: [],
  movies: [],
  searchParams: initParams(),
  previousSearchLoaded: true,
  movieLoaded: true,
  paginator: null,
};

function getSearchParams(searchParams: MovieSearchParams) {
  const params = new URLSearchParams();
  params.append("page", searchParams.pageNumber.toString());
  if (searchParams.query) params.append("query", searchParams.query);
  if (searchParams.year) params.append("year", searchParams.year.toString());
  if (searchParams.type) params.append("type", searchParams.type);

  return params;
}

export const searchMoviesAsync = createAsyncThunk<
  Movie[],
  void,
  { state: RootState }
>("movies/searchMoviesAsync", async (_, thunkAPI) => {
  const params = getSearchParams(thunkAPI.getState().movies.searchParams);
  try {
    const response = await agent.Movies.search(params);
    // Add Pagination data here
    thunkAPI.dispatch(setPaginatorData(response));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchMovieDetailsAsync = createAsyncThunk<MovieExtended, string>(
  "movies/fetchMovieDetailsAsync",
  async (id, thunkAPI) => {
    try {
      return await agent.Movies.fetchDetailsById(id);
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchPreviousSearchAsync = createAsyncThunk(
  "movies/fetchPreviousSearchAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Movies.fetchPreviousSearch();
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.moviesLoaded = false;
      state.searchParams = {
        ...state.searchParams,
        ...action.payload,
        page: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.moviesLoaded = false;
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    setPaginatorData: (state, action) => {
      state.paginator = action.payload;
    },
    resetFilter: (state) => {
      state.searchParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchMoviesAsync.pending, (state) => {
      state.status = "pendingFetchMovies";
      state.moviesLoaded = false;
    });
    builder.addCase(searchMoviesAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.moviesLoaded = true;
      state.movies = action.payload;
      state.previousSearchLoaded = false;
    });
    builder.addCase(searchMoviesAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    // Handle previous search
    builder.addCase(fetchPreviousSearchAsync.pending, (state) => {
      state.status = "pendingFetchPreviousSearch";
    });
    builder.addCase(fetchPreviousSearchAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.previousSearchLoaded = true;
      state.previousSearch = action.payload;
    });
    builder.addCase(fetchPreviousSearchAsync.rejected, (state, action) => {
      state.status = "idle";
      state.previousSearchLoaded = true; // Prevent continues request
    });

    // Handle movie details fetch
    builder.addCase(fetchMovieDetailsAsync.pending, (state) => {
      state.status = "pendingFetchMovieDetailsAsync";
      state.movie = undefined;
      state.movieLoaded = false;
    });
    builder.addCase(fetchMovieDetailsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.movie = action.payload;
      state.movieLoaded = true;
    });
    builder.addCase(fetchMovieDetailsAsync.rejected, (state, action) => {
      state.status = "idle";
      state.movieLoaded = true;
    });
  },
});

export const { setSearchParams, setPageNumber, setPaginatorData, resetFilter } =
  moviesSlice.actions;
