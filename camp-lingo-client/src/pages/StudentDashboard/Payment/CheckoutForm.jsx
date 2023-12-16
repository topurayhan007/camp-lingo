import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import "./CheckoutForm.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log('payment method', paymentMethod)
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        cartId: cart._id,
        classId: cart.classItemId,
        className: cart.name,
        classImage: cart.image,
        instructorName: cart.instructorName,
        instructorEmail: cart.instructorEmail,
        enrolled: cart.enrolled,
        price,
        date: new Date(),
        status: "service pending",
      };
      axiosSecure.post("/payment", payment).then((res) => {
        console.log("res", res.data);
        if (
          res.data.insertResult.insertedId &&
          res.data.deleteResult.deletedCount > 0 &&
          res.data.updateResult.modifiedCount > 0
        ) {
          form.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/dashboard/selected-classes");
        }
      });
    }
  };

  return (
    <>
      <div className="w-2/3">
        <h2 className="font-bold text-2xl py-3">Payment Details </h2>
        <p className="font-semibold text-lg pb-2 text-slate-500">
          Cart Item: {cart.name}
        </p>
        <p className="font-semibold text-lg text-violet-500">
          Total: ${cart.price}
        </p>
      </div>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn normal-case bg-green-400 hover:bg-green-500 mt-2 w-full text-black text-xl"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
