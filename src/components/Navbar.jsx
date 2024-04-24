import React from "react";
import { useState, useEffect } from "react";
import Aura from '../assets/Okta_Aura_Black_S.png'
import '../App.css';
import { useAuth0 } from "@auth0/auth0-react";


export const Navbar = () => {
	const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

	const [sideBarOpen, setSideBarOpen] = useState(false)

	const handleSideBarClick = () => {
		setSideBarOpen(!sideBarOpen)
	}

	const authButton = () => {
		if (!isAuthenticated) {
			return <li><p style={{cursor:"pointer"}} onClick={() => loginWithRedirect()}>Login</p></li>
		} else {
			return <li><strong>{user.name}</strong><a href="" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> - Logout</a></li>
		}
	}

	return (
		<div>
			<nav className="main-nav">
				<div className="logo-aura">
					<img src={Aura} />
				</div>
				<div>
					<ul id="navbar-links">
						{authButton()}
					</ul>
				</div>
				<div id="mobile" onClick={handleSideBarClick}>
					<i className={sideBarOpen ? "fas fa-times" : "fas fa-bars"} />
				</div>
			</nav>
		</div>
	)

}