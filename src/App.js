import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import Home from "./components/Home";
import Category from "./components/Category";
import Booking from "./components/Booking";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = () => {
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
	};

	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				{isAuthenticated && <Header onLogout={handleLogout} />}
				<main className="flex-grow">
					<Routes>
						<Route
							path="/"
							element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
						/>
						<Route path="/signup" element={<UserSignup />} />
						<Route
							path="/login"
							element={<UserLogin onLogin={handleLogin} />}
						/>
						<Route
							path="/category/:categoryName"
							element={
								isAuthenticated ? (
									<Category />
								) : (
									<UserLogin onLogin={handleLogin} />
								)
							}
						/>
						<Route
							path="/booking/:movieId"
							element={
								isAuthenticated ? (
									<Booking />
								) : (
									<UserLogin onLogin={handleLogin} />
								)
							}
						/>
					</Routes>
				</main>
				{isAuthenticated && <Footer />}
			</div>
		</Router>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
