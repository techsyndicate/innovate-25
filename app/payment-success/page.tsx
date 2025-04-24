"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [paymentStatus, setPaymentStatus] = useState("Payment Processing...");

  useEffect(() => {
    if (sessionId) {
      fetch("/api/payment-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Payment successful!");
            setPaymentStatus("Payment successful!");
          } else {
            console.error("Payment failed.");
            setPaymentStatus(data.error);
          }
        });
    } else {
      console.error("No session ID provided.");
      setPaymentStatus("No session ID provided.");
    }
  }, [sessionId]);

  return <div>{paymentStatus}</div>;
}
