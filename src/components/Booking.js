// src/components/Booking.js
import React, { useState, useEffect } from "react";
import { ref, onValue, push } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import { useParams } from "react-router-dom";

const Booking = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [showtime, setShowtime] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		const movieRef = ref(db, `movies/${movieId}`);
		onValue(movieRef, (snapshot) => {
			const data = snapshot.val();
			setMovie(data);
		});
	}, [movieId]);

	const handleBooking = async (e) => {
		e.preventDefault();
		try {
			const bookingRef = ref(db, "bookings");
			await push(bookingRef, {
				name,
				email,
				phone,
				showtime,
				movie: movie.name,
				movieId: movieId,
			});
			setMessage("Booking successful! A confirmation email has been sent.");
			// Clear form fields after successful booking
			setName("");
			setEmail("");
			setPhone("");
			setShowtime("");
		} catch (err) {
			setMessage(`Booking failed: ${err.message}`);
		}
	};

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto px-4">
			<h2 className="text-2xl font-bold mb-4">Book Tickets for {movie.name}</h2>
			<form onSubmit={handleBooking} className="space-y-4">
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<input
					type="text"
					placeholder="Phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<select
					value={showtime}
					onChange={(e) => setShowtime(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				>
					<option value="" disabled>
						Select Showtime
					</option>
					{movie.showtimes &&
						Object.values(movie.showtimes).map((showtime, index) => (
							<option
								key={index}
								value={`${showtime.date} at ${showtime.time}`}
							>
								{showtime.date} at {showtime.time}
							</option>
						))}
				</select>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
				>
					Book Now
				</button>
			</form>
			{message && <p className="mt-4">{message}</p>}
		</div>
	);
};

export default Booking;
