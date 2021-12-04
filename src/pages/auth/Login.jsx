import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
    Card,
    Col,
    Row,
    Button,
    Container,
    Spinner
} from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import {
    CLIENT_ID,
    CLIENT_SECRET,
    github_url,
    PROXY_URL,
    REDIRECT_URL
} from "../../constants"

function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [redirecting, setRedirecting] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const { search } = location
        if (search.includes("?code=")) {
            const code = search.replace("?code=", "")

            const params = {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code
            }

            axios
                .post(
                    `${PROXY_URL}`,
                    {},
                    {
                        params,
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then((res) => {
                    const { status, data } = res
                    if (status === 200) {
                        const { access_token } = data
                        setRedirecting(true)
                        setIsLoading(true)

                        axios
                            .post(
                                "https://api.github.com/user",
                                {},
                                {
                                    headers: {
                                        Authorization: `token ${access_token}`
                                    }
                                }
                            )
                            .then((res) => {
                                const { status, data } = res
                                if (status === 200) {
                                    sessionStorage.setItem(
                                        "user",
                                        JSON.stringify(data)
                                    )
                                    sessionStorage.setItem("isLoggedIn", true)
                                    setIsLoading(false)
                                    setRedirecting(false)
                                    navigate("/")
                                }
                            })
                    }
                })
        }
    }, [])

    const btnLoading = () => {
        return redirecting ? (
            <><Spinner size="sm" animation="grow" /> <i>redirecting</i></>
        ) : (
            <>
                <FontAwesomeIcon icon={faGithub} />
                Login
            </>
        )
    }

    return (
        <Row className="d-flex justify-content-center align-items-center vh-100">
            <Col sm={6} md={4} lg={3}>
                <Card>
                    <Card.Body>
                        <Container>
                            <div className="py-3 text-center mb-5">
                                <div className="fs-3 fw-bold">
                                    Welcome back!
                                </div>
                                <div className="fs-6 sub-title">
                                    Please login to continue
                                </div>
                            </div>
                            <a href={github_url(CLIENT_ID, REDIRECT_URL)} onClick={() => setIsLoading(true)}>
                                <Button variant="dark" className="w-100" disabled={isLoading}>
                                    {btnLoading()}
                                </Button>
                            </a>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Login
