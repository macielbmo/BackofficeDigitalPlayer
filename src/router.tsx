import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { Content } from "./pages/content";
import { WebSites } from "./pages/websites";
import { Screens } from "./pages/screens";
import { ScreenCreator } from "./pages/screen-creator";
import { Player } from "./pages/player";
import { ContentDetails } from "./pages/contentDetails";
import ProtectedRoute from "../services/ProtectedRouter"; // Importar o componente ProtectedRoute

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <ProtectedRoute element={<Content />} />
    },
    {
        path: "/content/:id",
        element: <ProtectedRoute element={<ContentDetails />} />
    },
    {
        path: "/websites",
        element: <ProtectedRoute element={<WebSites />} />
    },
    {
        path: "/screens",
        element: <ProtectedRoute element={<Screens />} />
    },
    {
        path: "/screens/:id",
        element: <ProtectedRoute element={<ScreenCreator />} />
    },
    {
        path: "/player/:id",
        element: <Player />
    }
]);

export { router };
