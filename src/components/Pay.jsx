import React, { useEffect, useState } from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
// import { useHistory } from "react-router";
import { useNavigate } from "react-router-dom";

const KEY = "pk_test_51Nd6x9SJrFQZwPjvN4LIgeoWTDcquuYdfAfGXJ8CAfLEb3X5u5lWz9gnmHjOJf8Q5VoyWgTq5u4lxoBivXuyJxcB00LkTtYT7m";

const Pay = () => {

    const [stripeToken, setStripeToken] = useState(null);
    // const history = useHistory();
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:8000/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                );

                console.log(res.response.data);
                // history.push("/success");
                navigate("/success");
            } catch (error) {
                console.log(error);
            }
        };

        stripeToken && makeRequest();
    }, [stripeToken, navigate]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {stripeToken ? (
                <span>Processing. Please wait...</span>
            ) : (
                <StripeCheckout
                    name="Shopsy"
                    image="https://avatars.githubusercontent.com/u/1486366?v=4"
                    billingAddress
                    shippingAddress
                    description="Your total is $20"
                    amount={2000}
                    token={onToken}
                    stripeKey={KEY}
                >
                    <button
                        style={{
                            border: "none",
                            width: 120,
                            borderRadius: 5,
                            padding: "20px",
                            backgroundColor: "black",
                            color: "white",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Pay Now
                    </button>
                </StripeCheckout>
            )}
        </div>
    );
};

export default Pay;