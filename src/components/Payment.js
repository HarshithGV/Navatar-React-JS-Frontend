import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RazorpayPaymentButton = () => {
  const [orderId, setOrderId] = useState('');
  const [rz_payment_id, setPaymentId]= useState('');

  const handleClick = async () => {
    try {
      const response = await axios.get('https://navatar.sangamone.com/viewTarrif2');
      const orderId = response.data.order_id;
      const amount = response.data.amount;

      const options = {
        "key": "rzp_live_xSgdnHwFk1KkZ8", // Enter the Key ID generated from the Dashboard
        "currency": "INR",
        "name": "SangamOne", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "/Agora",
        "handler": async function (response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          setPaymentId("Next");
          console.log(rz_payment_id);

          //POST Payment_id and Order_id
          const paymentApiUrl = `https://navatar.sangamone.com/savePayment?amount=${amount}&order_id=${orderId}&payment_status=success&rz_payment_id=${response.razorpay_payment_id}&user_id=1`;
          console.log(paymentApiUrl)
          const paymentApiResponse = await axios.post(paymentApiUrl);
          console.log(paymentApiResponse.data);
        },
        "prefill": {
            "name": "CSR", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "7667327639"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
      });

      rzp1.open();

    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSuccess = (response) => {
    const paymentId = response.razorpay_payment_id;
    console.log('Payment successful. Payment ID:', paymentId);
  };

  return (
    <>
      <button id="rzp-button1" onClick={handleClick}>Pay</button>
     <Link to="/Agora"> <h1>{rz_payment_id}</h1></Link>
    </>
  );
};

export default RazorpayPaymentButton;