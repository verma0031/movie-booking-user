// src/components/Home.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [categories, setCategories] = useState({});

	useEffect(() => {
		// Fetch categories
		const categoriesRef = ref(db, "categories/");
		onValue(categoriesRef, (snapshot) => {
			const data = snapshot.val();
			const categoriesMap = data
				? Object.keys(data).reduce((acc, key) => {
						acc[key] = data[key].name;
						return acc;
				  }, {})
				: {};
			setCategories(categoriesMap);
		});

		// Fetch movies
		const moviesRef = ref(db, "movies/");
		onValue(moviesRef, (snapshot) => {
			const data = snapshot.val();
			const moviesArray = data
				? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
				: [];
			setMovies(moviesArray);
		});
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-4">Movies</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{movies.map((movie) => (
					<div
						key={movie.id}
						className="bg-white rounded-lg shadow-md overflow-hidden"
					>
						<img
							src={movie.posterUrl}
							alt={movie.name}
							className="w-full h-48 object-cover"
						/>
						<div className="p-4">
							<h3 className="text-xl font-bold">{movie.name}</h3>
							<p className="mt-2">{movie.description}</p>
							<p className="mt-2 font-bold">
								Category: {categories[movie.category]}
							</p>
							<div className="mt-4">
								<h4 className="font-bold">Showtimes:</h4>
								{movie.showtimes &&
									Object.values(movie.showtimes).map((showtime, index) => (
										<p key={index}>
											{showtime.date} at {showtime.time}
										</p>
									))}
							</div>
							<Link
								to={`/booking/${movie.id}`}
								className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
							>
								Book Now
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
