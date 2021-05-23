import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Wallet from "./Wallet"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import "./App.css"

function App() {
	return (
		<Container className="container">
			<div className="card" style={{border: "0px"}}>
				<Router>
				<AuthProvider>
					<Switch>
						<PrivateRoute exact path="/" component={Wallet} />
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route path="/forgot-password" component={ForgotPassword} />
					</Switch>
				</AuthProvider>
				</Router>
			</div>
		</Container>
	)
}

export default App
