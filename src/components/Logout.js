import React, { useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import './Logout.css'

export default function Logout() {
    const [error, setError] = useState("");
    const { logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("")

        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }

    return (
        <React.Fragment>
            <input className="button-logout" type="button" value="Log Out" onClick={handleLogout} />
            {error && <Alert variant="danger">{error}</Alert>}
        </React.Fragment>
    );
}
