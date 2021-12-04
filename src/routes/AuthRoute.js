import React from "react"
import { Navigate } from "react-router"
import Layout from "../pages/Layout"

function AuthRoute({ component: Component, authProtected }) {
    const authed =
        authProtected && sessionStorage.getItem("isLoggedIn") === null
    return authed ? (
        <Navigate to="/auth/login" />
    ) : (
        <Layout>
            <Component />
        </Layout>
    )
}

export default AuthRoute
