"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MenuItemCard from "@/components/MenuItemCard";
import { useRouter } from "next/navigation";
import MenuItem from "@/types/MenuItem";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Loading from "@/components/Loading";

function Menu() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState("Morgott’s Omen King Tandoor");
  const [veg, setVeg] = useState("both");
  const [filterByRating, setFilterByRating] = useState(false);
  const [bestseller, setBestseller] = useState(false);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [notification, setNotification] = useState<Notyf | null>(null);
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    const notyfInstance = new Notyf({
      duration: 2000,
      position: { x: "right", y: "bottom" },
    });
    setNotification(notyfInstance);
  }, []);

  useEffect(() => {
    const hasItemsInOrder = menu.some((item) => item.quantity > 0);
    setShowConfirmOrder(hasItemsInOrder);
  }, [menu]);

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

  const confirmOrder = () => {
    const itemsToOrder = menu.filter((item: any) => item.quantity > 0);

    if (itemsToOrder.length === 0) {
      notification!.error("Kindly select an item before proceeding.");
      return;
    }

    localStorage.setItem(
      "orderData",
      JSON.stringify({
        items: itemsToOrder,
        restaurant: restaurant,
      })
    );

    router.push("/order-details");
  };

  const handleQuantityChange = (id: string | undefined, quantity: number) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item._id === id || item.name === id ? { ...item, quantity } : item
      )
    );
  };

  const handleVegChange = () => {
    if (veg == "both") {
      setVeg("veg");
    } else if (veg == "veg") {
      setVeg("non-veg");
    } else if (veg == "non-veg") {
      setVeg("both");
    }
  };

  const getMenu = async () => {
    try {
      const response = await fetch("/api/getMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: restaurant,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMenu(data.menu);
        for (let i = 0; i < data.menu.length; i++) {
          data.menu[i].quantity = 0;
        }
        setMenuLoading(false);
      } else {
        notification!.error("Failed to fetch menu.");
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      notification!.error("Error fetching menu. Please try again later.");
    }
  };

  useEffect(() => {
    getMenu();
  }, [veg, filterByRating, bestseller]);

  if (menuLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Navbar />

      <h1
        style={{
          fontFamily: "var(--font-mantinia)",
        }}
        className="text-[#FFB84D] text-[7vw] ml-[10vw]"
      >
        ORDER FOOD
      </h1>
      <h1 className="ml-[10vw] text-[rgba(255,255,255,0.6)] text-[4.5vw]">
        {restaurant}
      </h1>

      <div className="w-[80vw] ml-[10vw] mt-[8.67vw] relative">
        <img src="./menu/search.svg" className="" alt="" />
        <input
          type="text"
          className="absolute top-[2.70vw] text-[4.5vw] placeholder:text-[rgba(255,255,255,0.6)] outline-none border-none left-[8vw]"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        <img
          src="./menu/search-button.svg"
          className="absolute h-[8.67vw] top-[1.5vw] right-[3vw]"
          alt=""
        />
      </div>
      <div className="ml-[15vw] mt-[3.25vw] flex flex-row items-center gap-[2vw]">
        <img
          onClick={() => handleVegChange()}
          src={`./menu/${veg}.svg`}
          className="w-[14.6vw]"
          alt=""
        />
        <img
          src={
            filterByRating ? "./menu/clicked-rating.svg" : "./menu/rating.svg"
          }
          onClick={() => setFilterByRating(!filterByRating)}
          className="w-[13vw]"
          alt=""
        />
        <img
          src={
            bestseller
              ? "./menu/clicked-bestseller.svg"
              : "./menu/bestseller.svg"
          }
          onClick={() => setBestseller(!bestseller)}
          className="w-[17.498vw]"
          alt=""
        />
      </div>
      <div className="">
        <div className="flex flex-col gap-[4.33vw] mt-[8.66vw] ml-[10vw]">
          <h1 className="text-[7vw]">Appetizers</h1>
          {menu.map(
            (item: any, index) =>
              item.mealType === "Starters" &&
              (veg === "both" ||
                (veg === "veg" && item.veg === true) ||
                (veg === "non-veg" && item.veg === false)) &&
              (!filterByRating || item.rating >= 4) &&
              (!bestseller || item.bestseller === true) && (
                <MenuItemCard
                  visible={
                    item.name.toLowerCase().includes(searchQuery) ? true : false
                  }
                  key={index}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                />
              )
          )}
          <h1 className="text-[7vw]">Main Course</h1>
          {menu.map(
            (item: any, index) =>
              item.mealType === "Main Course" &&
              (veg === "both" ||
                (veg === "veg" && item.veg === true) ||
                (veg === "non-veg" && item.veg === false)) &&
              (!filterByRating || item.rating >= 4) &&
              (!bestseller || item.bestseller === true) && (
                <MenuItemCard
                  visible={
                    item.name.toLowerCase().includes(searchQuery) ? true : false
                  }
                  key={index}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                />
              )
          )}
          <h1 className="text-[7vw]">Desserts</h1>
          {menu.map(
            (item: any, index) =>
              item.mealType === "Desserts" &&
              (veg === "both" ||
                (veg === "veg" && item.veg === true) ||
                (veg === "non-veg" && item.veg === false)) &&
              (!filterByRating || item.rating >= 4) &&
              (!bestseller || item.bestseller === true) && (
                <MenuItemCard
                  visible={
                    item.name.toLowerCase().includes(searchQuery) ? true : false
                  }
                  key={index}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                />
              )
          )}
        </div>
        {showConfirmOrder && (
          <img
            src="./menu/confirm-button.svg"
            onClick={confirmOrder}
            className="w-[37vw] fixed bottom-[30vw] left-[31.5vw]"
            alt=""
          />
        )}
        <div className="h-[36.83vw]"></div>
      </div>
    </div>
  );
}

export default Menu;
