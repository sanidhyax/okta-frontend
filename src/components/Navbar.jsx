import React from "react";
import { useState, useEffect } from "react";
import Aura from '../assets/Okta_Aura_Black_S.png'
import '../App.css';

export const Navbar = () => {
	const [sideBarOpen, setSideBarOpen] = useState(false)

	const handleSideBarClick = () => {
		setSideBarOpen(!sideBarOpen)
	}

	return (
		<div>
			<nav className="main-nav">
				<div className="logo-aura">
					<img src={Aura} />
				</div>
				<div>
					<ul id="navbar-links">
						<li><a href="">Home</a></li>
						<li><a href="">Wishlist</a></li>
						<li><a href="">Cart</a></li>
					</ul>
				</div>
				<div id="mobile" onClick={handleSideBarClick}>
					<i className={sideBarOpen ? "fas fa-times" :"fas fa-bars"} />
				</div>
			</nav>
		</div>
	)

}