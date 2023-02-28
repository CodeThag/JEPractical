import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/Home/Index";
import MoviesPage from "../../features/Movies/Index";
import MovieDetailPage from "../../features/Movies/MovieDetail";
import Layout from "../layout/Layout";

export const MainNavigator = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            }, {
                path: '/movies',
                children: [{
                    path: "/movies/search/:query",
                    element: <MoviesPage />,
                }, {
                    path: "/movies/:id",
                    element: <MovieDetailPage />,
                }]
            }]
    }
]);