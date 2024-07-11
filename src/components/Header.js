// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
			<Link to="/" className="text-2xl font-bold">
				Movie Booking
			</Link>
			<nav>
				<ul className="flex space-x-4">
					<li>
						<Link to="/">Home</Link>
					</li>
					
				</ul>
			</nav>
		</header>
	);
};

export default Header;
