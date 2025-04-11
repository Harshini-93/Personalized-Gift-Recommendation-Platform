import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminGiftsPage = () => {
  const [gifts, setGifts] = useState([]);
  const [newGift, setNewGift] = useState({
    name: "",
    description: "",
    price: "",
    shoppingLink: "",
  });

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/gifts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGifts(response.data);
    } catch (error) {
      console.error("Error fetching gifts:", error);
    }
  };

  const addGift = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/gifts", newGift, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGifts();
      setNewGift({ name: "", description: "", price: "", shoppingLink: "" });
    } catch (error) {
      console.error("Error adding gift:", error);
    }
  };

  return (
    <div className="questionnaire-container">
      <h2>Admin - Manage Gifts</h2>
      <div>
        <input
          value={newGift.name}
          onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
          placeholder="Name"
          className="text-input"
        />
        <input
          value={newGift.description}
          onChange={(e) =>
            setNewGift({ ...newGift, description: e.target.value })
          }
          placeholder="Description"
          className="text-input"
        />
        <input
          value={newGift.price}
          onChange={(e) => setNewGift({ ...newGift, price: e.target.value })}
          placeholder="Price"
          className="text-input"
        />
        <input
          value={newGift.shoppingLink}
          onChange={(e) =>
            setNewGift({ ...newGift, shoppingLink: e.target.value })
          }
          placeholder="Link"
          className="text-input"
        />
        <button onClick={addGift} className="next-btn">
          Add Gift
        </button>
      </div>
      <ul>
        {gifts.map((gift) => (
          <li key={gift._id}>{gift.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminGiftsPage;
