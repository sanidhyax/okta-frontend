import React from "react";
import { Navbar } from "./Navbar";
import { ProductCatalogue } from "./ProductCatalogue";
import '../App.css';
import { useAuth0 } from "@auth0/auth0-react";


const Application = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return (
        <div className="App">
            <Navbar />
            {isAuthenticated ? <ProductCatalogue /> : <div className="login-page"><p className="login-text" onClick={() => loginWithRedirect()}>Please login using <strong><u>Okta Auth0</u></strong></p></div>}
        </div>
    )
}

export default Application;