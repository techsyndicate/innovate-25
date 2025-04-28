"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import { MongoUser } from "@/types/MongoUser";
import Loading from "@/components/Loading";

function Reserve() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [restaurant, setRestaurant] = useState("");
  const [people, setPeople] = useState("1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("00:01");
  const [number, setNumber] = useState("1");
  const [available, setAvailable] = useState(false);

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
      });
  }, [isLoaded, user]);

  if (!isLoaded || mongoUserLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRestaurant(event.target.value);
  };

  const handlePeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date();
    const selectedDate = new Date(event.target.value);
    if (selectedDate < date) {
      alert("Please select a future date.");
    } else {
      setDate(event.target.value);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleTableAdd = () => {
    if (restaurant && number && people) {
      fetch("/api/addTable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: restaurant, number, people }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Table added successfully!");
          } else {
            alert("Failed to add table.");
          }
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCheck = () => {
    if (restaurant && date && time && people) {
      fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mongoUser.email,
          restaurant,
          date,
          time,
          people,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Table available!");
            setAvailable(true);
          } else {
            alert(data.message);
          }
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleReserve = () => {
    if (available) {
      fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: mongoUser._id,
          restaurant,
          date,
          time,
          people,
          number,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Reservation successful!");
          } else {
            alert(data.message);
          }
        });
    } else {
      alert("Please check availability before reserving.");
    }
  };

  return (
    <div>
      <h1>CHOOSE A RESTAURANT TO MAKE RESERVATION IN</h1>
      <select value={restaurant} onChange={(e) => handleChange(e)}>
        <option value="">Select a restaurant</option>
        <option value="Godrick’s Grafted Grill">
          Godrick’s Grafted Grill (Seoul, South Korea)
        </option>
        <option value="Ranni’s Darkmoon Café">
          Ranni’s Darkmoon Café (Paris, France)
        </option>
        <option value="Radahn’s Cosmic Steakhouse">
          Radahn’s Cosmic Steakhouse (Texas, United States)
        </option>
        <option value="Mohg’s Blood Diner">
          Mohg’s Blood Diner (Dubai, UAE)
        </option>
        <option value="Rykard’s Forbidden BBQ Pit">
          Rykard’s Forbidden BBQ Pit (Sydney, Australia)
        </option>
        <option value="Miquella’s Haligtree Vegan Lounge">
          Miquella’s Haligtree Vegan Lounge (Montréal, Canada)
        </option>
        <option value="Morgott’s Omen King Tandoor">
          Morgott’s Omen King Tandoor (Chandigarh, Punjab, India)
        </option>
        <option value="test">test</option>
      </select>
      <br />
      <br />
      <h1>ADD A TABLE</h1>
      <p>Enter the number of people (1-10)</p>
      <input
        type="number"
        value={people!}
        onChange={(e) => handlePeopleChange(e)}
        placeholder="Enter number of people (1-10)"
      />
      <br />
      <br />
      <p>Enter the number of the table</p>
      <input
        type="text"
        value={number!}
        onChange={(e) => handleNumberChange(e)}
        placeholder="Enter the number of the table"
      />
      <button onClick={handleTableAdd}>Add table</button>
      <br />
      <br />
      <p>Enter the date (future only)</p>
      <input type="date" onChange={handleDateChange} value={date} />
      <br />
      <br />
      <p>Enter the number of people (1-10)</p>
      <input
        type="text"
        value={people!}
        onChange={(e) => handlePeopleChange(e)}
        placeholder="Enter number of people (1-10)"
      />
      <br />
      <br />
      <p>Enter checkin time</p>
      <input type="time" value={time} onChange={(e) => handleTimeChange(e)} />
      <br />
      <br />
      <button onClick={handleCheck}>Check for availability</button>
      <br />
      {available && (
        <div>
          <h1>RESERVE A TABLE</h1>
          <button onClick={handleReserve}>Reserve</button>
        </div>
      )}
      <br />
    </div>
  );
}

export default Reserve;
