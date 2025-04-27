"use client";
import React, { useState, useEffect } from "react";

function MenuItemCard({
  item,
  visible,
  onQuantityChange,
}: {
  item: any;
  visible: any;
  onQuantityChange?: (id: any, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(item.quantity || 0);

  useEffect(() => {
    setQuantity(item.quantity || 0);
  }, [item.quantity]);

  const updateQuantity = (newQuantity: number) => {
    const updatedQuantity = Math.max(0, newQuantity);
    setQuantity(updatedQuantity);

    if (onQuantityChange) {
      onQuantityChange(item._id || item.name, updatedQuantity);
    }
  };

  return (
    <div className={`flex flex-row gap-[2vw] ${visible ? 'visible' : 'hidden'}`}>
      <div className="flex flex-row">
        <div className="relative">
          <img src="./menu/item.svg" className="w-[70.5vw]" alt={item.name} />
          {item.veg ? (
            <img
              src="./menu/vegLogo.svg"
              className="w-[5vw] absolute top-[1.75vh] left-[2vw]"
              alt=""
            />
          ) : (
            <img
              src="./menu/nonVegLogo.svg"
              className="w-[5vw] absolute top-[1.75vh] left-[2vw]"
              alt=""
            />
          )}
          <p className="absolute top-[1.25vh] left-[9vw] text-[3.45vw]">
            {item.name}
          </p>
          <p className="absolute text-[rgba(255,255,255,0.5)] top-[3vh] left-[9vw] text-[2.6vw]">
            {item.description}
          </p>
          <p className="absolute text-[5vw] top-[1.4vh] right-[6vw]">
            ₹{item.price}
          </p>
        </div>
        <div className="relative">
          <img src={`./menu/cart.svg`} className="h-[5.85vh]" alt={item.name} />
          {quantity > 0 ? (
            <div className="">
              <h1 className="absolute top-[1.5vw] text-[7vw] left-[4.5vw]">
                {quantity}
              </h1>
              <img
                onClick={() => updateQuantity(quantity + 1)}
                src="./menu/arrow-up.svg"
                className="absolute top-[0.5vh] left-[4.3vw] w-[4vw]"
                alt=""
              />
              <img
                onClick={() => updateQuantity(quantity - 1)}
                src="./menu/arrow-down.svg"
                className="absolute bottom-[0.5vh] left-[4.3vw] w-[4vw]"
                alt=""
              />
            </div>
          ) : (
            <h1
              onClick={() => updateQuantity(1)}
              className="absolute top-[1vw] text-[7vw] left-[4.2vw]"
            >
              +
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
