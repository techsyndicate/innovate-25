"use client";

import React, { useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function AddQuest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questNumber, setQuestNumber] = useState(1);
  const notyf = new Notyf();

  const newQuest = () => {
    fetch("/api/quest/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        questNumber,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          window.location.reload();
        } else {
          notyf.error(data.message);
        }
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title:"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="Description:"
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <br></br>
      <input
        type="number"
        placeholder="Quest Number:"
        onChange={(e) => setQuestNumber(Number(e.target.value) || 0)}
      ></input>
      <br></br>
      <button onClick={() => newQuest()}>Add!</button>
    </div>
  );
}

export default AddQuest;
