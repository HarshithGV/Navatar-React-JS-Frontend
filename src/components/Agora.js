import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [remainingTime, setRemainingTime] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [bookedTimeSlot, setBookedTimeSlot] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch('https://navatar.sangamone.com/getBookedDetailByUserId?user_id=1');
        const data = await response.json();
        setBookingDate(data[0].bookingDate);
        setBookedTimeSlot(data[0].booked_timeSlot+":00:00");
      } catch (error) {
        console.log(error);
        setRemainingTime('Booking data not available');
      }
    };
    fetchBookingData();
  }, []);

  useEffect(() => {
    if (!bookingDate || !bookedTimeSlot) return;

    const interval = setInterval(() => {
      const now = new Date();
      const [hours, minutes] = bookedTimeSlot.split(':');
      const bookingDateTime = new Date(bookingDate);
      bookingDateTime.setHours(hours);
      bookingDateTime.setMinutes(minutes);
      const diff = bookingDateTime - now;
      if (diff < 0) {
        clearInterval(interval);
        setRemainingTime('Booking time has passed');
      } else {
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        setRemainingTime(`${days} days, ${hours} hours, ${minutes} minutes`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [bookingDate, bookedTimeSlot]);

  const buttonBackgroundColor = remainingTime === 'Booking time has passed' ? '' : 'rgb(201 201 199)';
  const buttonFontColor = remainingTime === 'Booking time has passed' ? '#fff' : 'rgb(133 127 127)';
  const borderColor = remainingTime === 'Booking time has passed' ? '3px solid #0e0ecb' : '3px solid #666464';

  return (
    <div style={{textAlign:"center"}}><br/>
      <Link to="/VideoRoom">
        <button
          disabled={remainingTime !== 'Booking time has passed'}
          style={{backgroundColor: buttonBackgroundColor, color: buttonFontColor, borderRadius:"0.5rem", border:borderColor}}
        >
          Join call
        </button>
      </Link>
      <br/><br/>
      <div><h1> {remainingTime}</h1></div>
      <div><h5>Booking Date: {bookingDate}</h5></div>
      <div><h5>Booking Time: {bookedTimeSlot}</h5></div>
    </div>
  );
}

export default App;
