import { Form } from "react-bootstrap"

export const Input = ({ label, type, placeholder, name, id }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                id={id}
                placeholder={placeholder}
                name={name}
            />
        </Form.Group>
    )
}