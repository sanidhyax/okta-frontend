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
				<div className='page-title-div'>
					<h1 className='page-title'>Product Catalogue</h1>
					<p className='page-subtitle'>Rudimentary product page by Sanidhya Jain</p>
					</div>
					<div className='navbar-links-div'>
					<ul id="navbar-links">
						{authButton()}
					</ul>
				</div>

			</nav>
		</div>
	)

}