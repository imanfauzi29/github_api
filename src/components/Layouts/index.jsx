import React from "react"
import { Container } from "react-bootstrap"
import NavigationBar from "./Navbar"

function Layouts({ children }) {
    return (
        <div style={{background: "#f0f0f0"}}>
            <NavigationBar />
            <Container>{children}</Container>
        </div>
    )
}

export default Layouts
