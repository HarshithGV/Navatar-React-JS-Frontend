import { useState } from "react";
import { getSelectedTime } from './selectedTime';
import { getSelectedNavatar } from './selectedNavatar';
import { getSelectedDate } from './selectedDate';
import { Link } from "react-router-dom";

function BookingForm() {
  const selectedTime = getSelectedTime();
  const selectedNavatar = getSelectedNavatar();
  const selectedDate = getSelectedDate();
  const [bookedStatus, setBookedStatus] = useState("success");
  const [bookedTimeSlot, setBookedTimeSlot] = useState(selectedTime);
  const [bookingDate, setBookingDate] = useState(selectedDate);
  const [navatarId, setNavatarId] = useState(selectedNavatar);
  const [userId, setUserId] = useState("1");

  const handleClick = () => {
    const url = `https://navatar.sangamone.com/setBooking?booked_status=${bookedStatus}&booked_timeSlot=${encodeURIComponent(bookedTimeSlot)}&bookingDate=${bookingDate}&navatar_id=${navatarId}&user_id=${userId}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // Here you can include any additional data you want to send to the server
        // as part of the POST request
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // This code will execute if the server returns a successful response
      console.log(data);
    })
    .catch(error => {
      // This code will execute if there is an error making the API call
      console.error("There was a problem with the API call:", error);
    });
  };

  return (
    <div style={{textAlign: "center"}}>

    <h3>You have selected navatar_id: {navatarId}<br/>Your Booking Date: {bookingDate}<br/>Your Navatar Call Booked Time:{bookedTimeSlot}:00</h3>
     <Link to="/Agora"> <button onClick={handleClick}>Next</button></Link>
    </div>
  );
}

export default BookingForm;
