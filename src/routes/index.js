import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { privateRoute, publicRoute } from "./routes"
import AuthRoute from "./AuthRoute"

function AppRoutes() {
    return (
        <Routes>
            {publicRoute.map((route, idx) => (
                <Route
                    key={idx}
                    element={<route.component />}
                    path={route.path}
                />
            ))}
            {privateRoute.map((route, idx) => (
                <Route
                    key={idx}
                    element={
                        <AuthRoute
                            component={route.component}
                            authProtected={true}
                        />
                    }
                    path={route.path}
                />
            ))}
        </Routes>
    )
}

export default AppRoutes
