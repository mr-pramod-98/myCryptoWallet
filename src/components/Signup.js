import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import './Signup.css'

export default function Signup() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { signup } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match")
		}

		try {
			setError("")
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value)
			history.push("/")
		} catch {
			setError("Failed to create an account")
		}

		setLoading(false)
	}

	return (
		<React.Fragment>
			<Card>
				<Card.Body>

				<h2 className="text-center mb-4">Sign Up</h2>
				{error && <Alert variant="danger">{error}</Alert>}

				<Form onSubmit={handleSubmit}>

					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" ref={emailRef} required />
					</Form.Group>

					<Form.Group id="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef} required />
					</Form.Group>

					<Form.Group id="password-confirm">
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control type="password" ref={passwordConfirmRef} required />
					</Form.Group>

					<input className="button-signup" disabled={loading} type="submit" value="Sign Up" />

				</Form>
				</Card.Body>	
			</Card>

			<div className="sub-card">
				Already have an account? <Link to="/login">Log In</Link>
			</div>

		</React.Fragment>
	)
}
