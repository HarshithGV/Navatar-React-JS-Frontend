import { useEffect, useState } from "react";

function loadScript(src){
    return new Promise(resolve => {
        const script = document.createElement('script')
        script.src = src
        document.body.appendChild(script)
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
    })
}

function App() { // changed the function name to start with an uppercase letter

    const [tariffData, setTariffData] = useState([]);
    const [order_Id, setOrder_ID] = useState('');
    const [amount_value, setAmount_value] = useState('');

    async function displayRazorpay(amount) {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }
        const data = await fetch('https://navatar.sangamone.com/viewTarrif2', { method: 'POST' }).then((t) =>
            t.json()
        )

        console.log(data[0].body)
        const options = {
            key: 'rzp_live_xSgdnHwFk1KkZ8',
            amount: amount_value,
            currency: 'INR',
            name: 'Navatar',
            description: 'Payment for booking Navatar',
            image: 'https://example.com/your_logo',
            order_id: order_Id,
            handler: function (response) {
                alert(response.razorpay_payment_id);
            },
            prefill: {
                name: 'Aashi Jain',
                email: 'aashijain.sangamone@gmail.com',
                contact: '9999999999'
            }
        };
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    useEffect(() => { // moved useEffect to outside of displayRazorpay function
        const fetchData = () => {
            fetch(`https://navatar.sangamone.com/viewTarrif2`)
                .then((response) => response.json())
                .then((actualData) => {
                    console.log(actualData);
                    setTariffData(actualData);
                    setOrder_ID(actualData[0].body);
                    setAmount_value(actualData[0].statusCodeValue);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchData();
    }, []); // removed data parameter from fetchData and added empty dependency array to useEffect

    return (
        <div className="App"> {/* changed class name to match function name */}
            <h1>Payment</h1>
            <h2>Please pay the following charges to book your Navatar.</h2>
            {tariffData.map((item, index) => (
                <div key={index}>
                    {/* <h2>{item.currency} {item.rate_per_slot}</h2> */}
                    <h2>{item.body}</h2>
                    <h3>{order_Id}</h3>
                    <h3>{amount_value}</h3>
                    <button
                        style={{ borderRadius: "0.75rem" }}
                        type="submit"
                        onClick={() => displayRazorpay(item.rate_per_slot)}>{/* added item.rate_per_slot as parameter to displayRazorpay */}
                        Pay
                    </button>
                </div>
            ))}
        </div>
    );
}

export default App;
