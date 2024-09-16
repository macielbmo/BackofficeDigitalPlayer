import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { Content } from "./pages/content";
import { WebSites } from "./pages/websites";
import { Screens } from "./pages/screens";
import { ScreenCreator } from "./pages/screen-creator";
import { Player } from "./pages/player";

const router = createBrowserRouter([
    {
        path: "/login",

        element: <Login />
    },
    {
        path: "/",
        element: <Content />
    },
    {
        path: "/websites",
        element: <WebSites />
    },
    {
        path: "/screens",
        element: <Screens />
    },
    {
        path: "/screens/:id",
        element: <ScreenCreator />
    },
    {
        path: "/player/:id",
        element: <Player />
    }
])

export { router }