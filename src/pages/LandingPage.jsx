import { faCodeBranch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Badge, Card, Col, Row } from "react-bootstrap"
import Layouts from "../components/Layouts"

function LandingPage() {
    const [repos, setRepos] = useState(null)

    useEffect(() => {
        let user = sessionStorage.getItem("user")
        user = JSON.parse(user)

        const repoUrl = user.repos_url
        getRepos(repoUrl)
    }, [])

    const getRepos = async (repoUrl) => {
        return await axios.get(repoUrl).then((res) => {
            const { status, data } = res
            if (status === 200) {
                let result = data.map(
                    ({
                        name,
                        language,
                        visibility,
                        default_branch
                    } = data) => ({
                        name,
                        language,
                        visibility,
                        default_branch
                    })
                )
                setRepos(result)
            }
        })
    }

    return (
        <Layouts>
            <Row className="mt-3">
                {repos &&
                    repos.map((repo) => (
                        <Col md="4" lg="3" sm="6" className="mb-3">
                            <Card style={{height: "150px"}}>
                                <Card.Body>
                                    <Card.Title className="d-flex align-items-center">
                                        {repo.name}
                                        <small
                                            className="ms-2"
                                            style={{
                                                fontSize: "12px",
                                                color: "#838383"
                                            }}>
                                            <FontAwesomeIcon
                                                icon={faCodeBranch}
                                            />{" "}
                                            {repo.default_branch}
                                        </small>
                                    </Card.Title>
                                    <Card.Text className="mt-5 d-flex justify-content-between">
                                        <small style={{ color: "#838383" }}>
                                            {repo.language}
                                        </small>
                                        <Badge pill bg="success">
                                            {repo.visibility}
                                        </Badge>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </Layouts>
    )
}

export default LandingPage
