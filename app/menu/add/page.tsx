"use client";
import React, { useState } from "react";

function Page() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(
    "Morgott’s Omen King Tandoor, Chandigarh"
  );
  const [location, setLocation] = useState("");
  const [demigod, setDemigod] = useState("");
  const [veg, setVeg] = useState(false);
  const [bestseller, setBestseller] = useState(false);
  const [desc, setDesc] = useState("");
  const [mealType, setMealType] = useState("");

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
      const rating = Math.floor(Math.random() * 5) + 1;
      fetch("/api/addMenuItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: restaurant,
          item,
          price,
          bestseller,
          veg,
          rating,
          description: desc,
          mealType,
        }),
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
    <div className="">
      <p>Welcome to the menu page!</p>

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
      <br />
      <p>Bestseller</p>
      <input
        type="checkbox"
        onClick={() => setBestseller(!bestseller)}
        name=""
        id=""
      />
      <br />
      <p>Veg</p>
      <input type="checkbox" onClick={() => setVeg(!veg)} name="" id="" />
      <br />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Meal Type"
        onChange={(e) => setMealType(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Item</button>
    </div>
  );
}

export default Page;
