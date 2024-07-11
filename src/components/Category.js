// src/components/Category.js

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useParams } from "react-router-dom";

const Category = () => {
	const { categoryName } = useParams();
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const categoryRef = ref(db, `categories/${categoryName}/movies`);

		onValue(categoryRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setMovies(Object.values(data));
			}
		});
	}, [categoryName]);

	return (
		<div className="container mx-auto px-4">
			<h2 className="text-2xl font-bold mb-4">Movies in {categoryName}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{movies.map((movie) => (
					<div key={movie.name} className="border rounded-md p-4 shadow-md">
						<h3 className="text-xl font-semibold">{movie.name}</h3>
						<p className="text-gray-600">{movie.description}</p>
						<p className="text-gray-600">IMDB Rating: {movie.imdbRating}</p>
						<p className="text-gray-600">Release Date: {movie.releaseDate}</p>
						<p className="text-gray-600">Director: {movie.director}</p>
						<p className="text-gray-600">Language: {movie.language}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Category;
