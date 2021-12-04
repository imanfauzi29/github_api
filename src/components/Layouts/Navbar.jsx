import React, { useEffect, useState } from "react"
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function NavigationBar() {
    const [data, setData] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        let user = sessionStorage.getItem("user")
        user = JSON.parse(user)
        setData(user)
    }, [])

    const logout = () => {
        sessionStorage.clear()
        navigate("/auth/login")
    }
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Nav className="justify-content-end">
                    {data !== null && (
                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-basic" bsPrefix="0">
                                <span className="me-3">{data.name}</span>
                                <img src={data.avatar_url} alt={data.name} width="30" className="rounded-circle" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={logout}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar
