import React, { useState } from 'react';
import axios from 'axios';

const RazorpayPaymentButton = () => {
  const [orderId, setOrderId] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.get('https://navatar.sangamone.com/viewTarrif2');
      const orderId = response.data.order_id;

      const options = {
        "key": "rzp_live_xSgdnHwFk1KkZ8", // Enter the Key ID generated from the Dashboard
      //  "amount": "20000",  Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "SangamOne", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "https://navatar-react-js-frontend.vercel.app/",
        "prefill": {
            "name": "CSR", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button id="rzp-button1" onClick={handleClick}>Pay</button>
  );
};

export default RazorpayPaymentButton;
