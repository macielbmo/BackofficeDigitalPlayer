import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { Content } from "./pages/content";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <Content />
    }
])

export { router }