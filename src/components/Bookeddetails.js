import React, { useState, useEffect } from 'react';
import "./Appnavatar.css";
import { getUserId } from './Loginstore';
import { Link } from 'react-router-dom';


function App() {
    const [bookings, setBookings] = useState([]);
    const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0, 10));
    const [timeLeft, setTimeLeft] = useState('');
    const userId = getUserId();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
    useEffect(() => {
      fetch(`https://navatar.sangamone.com/getBookedDetailByUserId?user_id=${userId}`)
        .then(response => response.json())
        .then(data => setBookings(data))
        .catch(error => console.error(error));
    }, [bookingDate]);
  
    useEffect(() => {
      if (bookings.length > 0) {
        const firstBooking = bookings[0]; // Get the first booking from the list
        const nextBookingTime = new Date(`${bookingDate} ${firstBooking.booked_timeSlot}:00`).getTime();
        const now = new Date().getTime();
  
        if (nextBookingTime < now) {
          setTimeLeft('Timer has passed.');
          setIsButtonDisabled(false); // Enable button when the timer reaches zero
        } else {
          const timer = setInterval(() => {
            const currentTime = new Date().getTime();
            if (nextBookingTime < currentTime) {
              setTimeLeft('Timer has passed.');
              clearInterval(timer);
              setBookingDate(new Date(currentTime).toISOString().slice(0, 10));
              setIsButtonDisabled(false); // Enable button when the timer reaches zero
            } else {
              const timeDiff = nextBookingTime - currentTime;
              const hours = Math.floor((timeDiff % (1000*60*60*24)) / (1000*60*60));
              const minutes = Math.floor((timeDiff % (1000*60*60)) / (1000*60));
              const seconds = Math.floor((timeDiff % (1000*60)) / 1000);
              setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            }
          }, 1000);
  
          return () => clearInterval(timer);
        }
      } else {
        setTimeLeft('No bookings for today.');
        setIsButtonDisabled(true); // Disable button when there are no bookings
      }
    }, [bookingDate, bookings]);
  

  return (
    <div>
      <br />
      
      <div style={{ textAlign: "center" }}>
        {/* Conditionally render the button based on the disabled status */}
        {isButtonDisabled ? (
          <button disabled style={{ backgroundColor: "gray", color: "white", border: "3px solid #5e5b5b", padding: "0.5rem 1.5rem", borderRadius: "0.85rem" }}>
            Join
          </button>
        ) : (
          <Link to="/VideoRoom"> <button style={{ backgroundColor: "blue", color: "white", border: "3px solid #1a1aa1", fontSize: "15px", padding: "0.5rem 1.5rem", borderRadius: "0.85rem" }}>Join</button></Link>
        )}
      </div><br/>
      <h1 style={{ textAlign: "center", fontSize: "22px" }}>{timeLeft}</h1>
      <table>
      <thead>
          <tr>
            <th>Booking ID</th>
            <th>User Profile</th>
            <th>User Name</th>
            <th>Booking Date</th>
            <th>Booking Time</th>
            <th>Booking Status</th>
            <th>Navatar ID</th>
            <th>Appointment Status</th>
          </tr>
        </thead> 
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking_id}>
              <td>{booking.booked_id}</td>
              <td><img style={{width: "100%"}} src={booking.user_photo_url}></img></td>
              <td>{booking.user_name}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.booked_timeSlot}:00</td>
              <td>{booking.booked_status}</td>
              <td>{booking.navatar_id}</td>
              <td>{booking.appt_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
