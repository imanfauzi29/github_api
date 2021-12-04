import Login from "../pages/auth/Login";
import LandingPage from "../pages/LandingPage";

const publicRoute = [
    {path: "/auth/login", component: Login}
]

const privateRoute = [
    {path: "/", component: LandingPage, exact: true}
]

export  { publicRoute, privateRoute }