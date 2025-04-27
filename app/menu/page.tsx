"use client";

import Header from "@/components/Header";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";

function Menu() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(
    "Morgott’s Omen King Tandoor, Chandigarh"
  );
  const [location, setLocation] = useState("");
  const [demigod, setDemigod] = useState("");
  const [veg, setVeg] = useState("both");
  const [filterByRating, setFilterByRating] = useState(false);
  const [bestseller, setBestseller] = useState(false);

  const handleVegChange = () => {
    if (veg == "both") {
      setVeg("veg");
    } else if (veg == "veg") {
      setVeg("non-veg");
    } else if (veg == "non-veg") {
      setVeg("both");
    }
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurant(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleDemigodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDemigod(e.target.value);
  };

  const handleAddRestaurant = () => {
    console.log("here");
    if (restaurant && location && demigod) {
      fetch("/api/addRestaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: restaurant, location, demigod }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Restaurant added successfully!");
          } else {
            alert("Failed to add restaurant.");
          }
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleSubmit = () => {
    if (item && price && restaurant) {
      fetch("/api/addMenuItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: restaurant, item, price }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert(
              `Added ${item} to restaurant ${data.restaurant.name} at price ${price} successfully!`
            );
          } else {
            alert("Failed to add item.");
          }
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

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

      <div className="w-[80vw] ml-[10vw] mt-[4vh] relative">
        <img src="./menu/search.svg" className="" alt="" />
        <input
          type="text"
          className="absolute top-[1.25vh] text-[4.5vw] placeholder:text-[rgba(255,255,255,0.6)] outline-none border-none left-[8vw]"
          placeholder="Search"
        />
        <img
          src="./menu/search-button.svg"
          className="absolute h-[4vh] top-[0.7vh] right-[3vw]"
          alt=""
        />
      </div>
      <div className="ml-[15vw] mt-[1.5vh] flex flex-row items-center gap-[2vw]">
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
      {/* <div className="ml-[10vw] mt-[2vh] bg-[rgba(255,255,255,0.1)] w-fit p-[2vw] flex flex-col gap-[2vh]">
        <h1 className="w-fit">Godrick’s Grafted Grill, Seoul</h1>
        <h1 className="w-fit">Ranni’s Darkmoon Café, Paris</h1>
        <h1 className="w-fit">Radahn’s Cosmic Steakhouse, Texas</h1>
        <h1 className="w-fit">Mohg’s Blood Diner, Dubai</h1>
        <h1 className="w-fit">Rykard’s Forbidden BBQ Pit, Sydney</h1>
        <h1 className="w-fit">Miquella’s Haligtree Vegan Lounge, Montréal</h1>
        <h1 className="w-fit">Morgott’s Omen King Tandoor, Chandigarh</h1>
      </div> */}

      {/* <p>Welcome to the menu page!</p>

      <h1>ADD RESTAURANT</h1>
      <input
        type="text"
        placeholder="enter restaurant name"
        onChange={handleRestaurantChange}
      />

      <input
        type="text"
        placeholder="enter restaurant location"
        onChange={handleLocationChange}
      />

      <input
        type="text"
        placeholder="enter restaurant demigod"
        onChange={handleDemigodChange}
      />

      <button onClick={handleAddRestaurant}>Add Restaurant</button>

      <h1>ADD MENU</h1>
      <input
        type="text"
        placeholder="enter food item"
        onChange={handleItemChange}
      />
      <input
        type="text"
        placeholder="enter price"
        onChange={handlePriceChange}
      />
      <input
        type="text"
        placeholder="enter restaurant name"
        onChange={handleRestaurantChange}
      />
      <button onClick={handleSubmit}>Add Item</button> */}
    </div>
  );
}

export default Menu;
