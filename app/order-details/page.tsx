"use client";
import Header from "@/components/Header";
import MenuItemCard from "@/components/MenuItemCard";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function OrderDetails() {
  const [orderData, setOrderData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("orderData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setOrderData(parsedData);
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }
  }, []);

  const handleQuantityChange = (id: string | undefined, quantity: number) => {
    if (!orderData) return;

    const updatedItems = orderData.items.map((item: any) =>
      item._id === id || item.name === id ? { ...item, quantity } : item
    );

    const filteredItems = updatedItems.filter((item: any) => item.quantity > 0);

    const updatedOrderData = {
      ...orderData,
      items: filteredItems,
    };

    setOrderData(updatedOrderData);
    localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
  };

  if (!orderData) return <div>Loading order details...</div>;

  const totalAmount =
    orderData.items?.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    ) || 0;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <h1 className="text-2xl">No order data found.</h1>
        <button
          className="mt-4 bg-[#FFB84D] text-black py-2 px-4 rounded-md"
          onClick={() => router.push("/menu")}
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Header />
      <h1
        style={{
          fontFamily: "var(--font-mantinia)",
        }}
        className="text-[#FFB84D] text-[7vw] ml-[10vw]"
      >
        ORDER DETAILS
      </h1>

      <p className="ml-[10vw] text-[rgba(255,255,255,0.6)] text-[4.5vw] mb-6">
        {orderData.restaurant}
      </p>

      <img
        src="./menu/edit-order.svg"
        className="w-[32vw] mt-[-4vw] ml-[10vw]"
        onClick={() => router.push("/menu")}
        alt=""
      />
      <div className="flex flex-col gap-[4.33vw] ml-[10vw]">
        {orderData.items &&
          orderData.items.map((item: any, key: any) => (
            <MenuItemCard
              item={item}
              key={key}
              visible={true}
              onQuantityChange={handleQuantityChange}
            />
          ))}
      </div>

      <div className="ml-[10vw] mr-[10vw] mt-[8vw]">
        <div className="flex justify-between text-[4.5vw] mb-2">
          <span>Subtotal:</span>
          <span>₹{totalAmount}</span>
        </div>
        <div className="flex justify-between text-[4.5vw] mb-2">
          <span>GST @ 18%:</span>
          <span>₹{((totalAmount / 100) * 18).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[4.5vw] mb-2">
          <span>Convenience Fee:</span>
          <span>₹{((totalAmount / 100) * 5).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[5vw] text-[#FFB84D] mt-4 pt-4 border-t border-[#444]">
          <span>Total:</span>
          <span>
            ₹
            {(
              totalAmount +
              (totalAmount / 100) * 18 +
              (totalAmount / 100) * 5
            ).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-4 mx-[10vw] mt-[8vw] mb-[15vw]">
        <img
          src="./menu/place-order.svg"
          className="w-[80vw]"
          onClick={() => {
            if (orderData.items.length === 0) {
              alert("Your order is empty. Please add items.");
              return;
            }
            router.push("/payment");
          }}
          alt=""
        />
      </div>
      <div className="h-[20vw]"></div>
    </div>
  );
}

export default OrderDetails;
