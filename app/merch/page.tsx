"use client";
import React, { useState, useEffect } from "react";

function Page() {
  const [merch, setMerch] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleAddMerch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("/api/addMerch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: merch,
        price: price,
        description: description,
      }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Merch added successfully!");
    } else {
      alert("Error adding merch.");
    }
  };

  const handleMerchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMerch(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrice(value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <h1>Buy a merch</h1>
      <br />
      <br />
      <h1>Add a merch</h1>
      <p>Enter name of the merch</p>
      <input
        type="text"
        placeholder="Enter name"
        onChange={handleMerchChange}
        value={merch}
      />
      <br />
      <p>Enter price of the merch</p>
      <input
        type="text"
        placeholder="Enter price"
        onChange={handlePriceChange}
        value={price}
      />
      <br />
      <p>Enter description of the merch</p>
      <input
        type="text"
        placeholder="Enter description"
        onChange={handleDescriptionChange}
        value={description}
      />
      <br />
      <button onClick={(e) => handleAddMerch(e)}>Add merch</button>
    </div>
  );
}

export default Page;
