export interface Movie {
  imdbID: string;
  title: string;
  year: string;
  type: string;
  poster: string;
}

export interface MovieExtended extends Movie {
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  ratings: Rating[];
  metascore: string;
  imdbRating: number;
  imdbVotes: string;
  dVD: string;
  boxOffice: string;
  production: string;
  website: string;
  response: boolean;
}

interface Rating {
  source: string;
  value: string;
}

export interface MovieSearchParams {
  query?: string;
  pageNumber: number;
  type?: string;
  year?: number;
}
