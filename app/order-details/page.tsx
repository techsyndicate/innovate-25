"use client";
import Header from "@/components/Header";
import MenuItemCard from "@/components/MenuItemCard";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import { MongoUser } from "@/types/MongoUser";
import Loading from "@/components/Loading";

function OrderDetails() {
  const [orderData, setOrderData] = useState<any>(null);
  const [restaurant, setRestaurant] = useState("");
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [notification, setNotification] = useState<Notyf | null>(null);
  const [slideStatus, setSlideStatus] = useState(false);

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isRightSwipe = distance < -minSwipeDistance;
    const isLeftSwipe = distance > minSwipeDistance;
    if (isRightSwipe) {
      setSlideStatus(true);
      setTimeout(() => {
        notification!.success('Confirmed! Please wait...')
        handleOrderConfirmation()
      }, 300)
    }
  };

  useEffect(() => {
    const notyfInstance = new Notyf({
      duration: 2000,
      position: { x: "right", y: "bottom" },
    });
    setNotification(notyfInstance);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setMongoUserLoading(false);
          setMongoUser(data.user);
        } else {
          console.error("An error occured while fetching user.");
          setMongoUserLoading(false);
          return router.push("/sign-in");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setMongoUserLoading(false);
      });
  }, [isLoaded, user, router]);

  useEffect(() => {
    const storedData = localStorage.getItem("orderData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setRestaurant(parsedData?.restaurant || "");
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

  const handleOrderConfirmation = () => {
    if (!mongoUser?._id) {
      notification!.error("Please sign in to place an order");
      return router.push("/sign-in");
    }

    fetch("/api/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: mongoUser._id, menu: orderData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("orderData");
          router.push("/order-details/confirmation");
        } else {
          notification!.error("An error occurred while placing the order.");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        notification!.error("Network error. Please try again.");
      });
  };

  if (!isLoaded || mongoUserLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

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

  const totalAmount = orderData.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

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
        {orderData.items.map((item: any, index: number) => (
          <MenuItemCard
            item={item}
            key={`${item._id || item.name}-${index}`}
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
        <div className="w-[60vw] relative ml-[10vw]">
          <img
            src="/order_img/orderbtn.svg"
            className="w-[60vw] relative"
            onClick={handleOrderConfirmation}
            alt="Place order button"
          />
          <img
            src="/order_img/orderslider.svg"
            className={`left-[2vw] w-[15vw] absolute top-[1.5vw] z-[100] ${
              slideStatus
                ? "[animation-name:slideRight] [animation-duration:0.3s] [animation-fill-mode:forwards]"
                : ""
            }`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          ></img>
          <div
            className={`w-[47vw] absolute right-[0] text-center top-0 h-[100%] flex items-center justify-center ${
              slideStatus
                ? "[animation-name:disappear] [animation-duration:0.3s] [animation-fill-mode:forwards]"
                : ""
            }`}
          >
            Slide to place order
          </div>
        </div>
      </div>
      <div className="h-[20vw]"></div>
    </div>
  );
}

export default OrderDetails;
