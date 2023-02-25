import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/HomePage";
import SearchPage from "../../features/Search/Index";

export const MainNavigator = createBrowserRouter([
    {
        path: "/search",
        element: <HomePage />,
    },
    {
        path: "/",
        element: <SearchPage />
    }
]);