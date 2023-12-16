import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const cls = location.state?.cls;
  const classPrice = cls.price;
  const price = parseFloat(classPrice.toFixed(2));

  return (
    <div className="absolute top-0">
      <Helmet>
        <title>CampLingo | Student Selected Classes</title>
      </Helmet>
      <h2 className="text-center text-xl md:text-4xl font-bold mt-3 md:mt-6 mb-3">
        Checkout
      </h2>
      <div className="flex justify-center mb-8">
        <hr className="border-2 rounded w-20 border-green-400 flex justify-center text-center" />
      </div>
      <div className="w-full">
        <Helmet>
          <title>CampLingo | Make Payment</title>
        </Helmet>

        <div className="md:w-[700px] w-96 flex items-center flex-col">
          <Elements stripe={stripePromise}>
            <CheckoutForm cart={cls} price={price}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
