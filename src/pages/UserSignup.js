// src/pages/UserSignup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const UserSignup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("User signed up successfully:", userCredential.user);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="max-w-sm mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-4">User Signup</h2>
			<form onSubmit={handleSignup} className="space-y-4">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				{error && <p className="text-red-500">{error}</p>}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default UserSignup;
