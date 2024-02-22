import { Doctor } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Button } from "../ui/button";
import { onAppointment } from "@/actions/appointment";
import { currentUser } from "@/lib/current-user";

interface CheckoutButtonProps {
  doctorData: Doctor;
  userId: string | undefined;
}

export default function CheckoutButton({
  doctorData,
  userId,
}: CheckoutButtonProps) {
  const redirectToCheckout = async () => {
    try {
      onAppointment(doctorData.id, userId);
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY as string
      );

      if (!stripe) throw new Error("Stripe failed to initialize.");

      await axios
        .post("/api/checkout_sessions", { ...doctorData, amount: 500 })
        .then(async (res) => {
          const { sessionId } = await res.data;
          const stripeError = await stripe.redirectToCheckout({ sessionId });
          if (stripeError) {
            console.error(stripeError);
          }
        })
        .catch((err) => console.log("api:", err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={redirectToCheckout}
      className="rounded-md border border-transparent bg-sky-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 mr-2 disabled:bg-gray-600"
    >
      Checkout
    </Button>
  );
}
