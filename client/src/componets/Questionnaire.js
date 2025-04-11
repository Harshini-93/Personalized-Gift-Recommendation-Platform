import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Questionnaire.css"; // Relative path, assumes CSS is in same folder

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    interests: [],
    budget: "",
    occasion: "",
    age: "",
  });
  const [recommendations, setRecommendations] = useState([]);

  const interestOptions = [
    "gaming",
    "fashion",
    "reading",
    "business",
    "romance",
    "travel",
    "family",
    "building",
    "creativity",
    "luxury",
    "writing",
    "home",
    "cooking",
    "relaxation",
    "memories",
    "outdoors",
    "shopping",
  ];
  const occasionOptions = [
    "birthday",
    "promotion",
    "marriage",
    "anniversary",
    "holiday",
  ];

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = {
        interests: formData.interests,
        budget: Number(formData.budget) || 0,
        occasion: formData.occasion || "",
        age: Number(formData.age) || 0,
      };

      if (data.interests.length > 0 && data.budget > 0) {
        console.log("Sending:", data);
        try {
          const response = await axios.post(
            "http://localhost:5000/api/gifts/recommend",
            data
          );
          console.log("Received:", response.data);
          setRecommendations(response.data);
        } catch (error) {
          console.error(
            "Error:",
            error.response ? error.response.status : error.message
          );
          setRecommendations([]);
        }
      } else {
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [formData]);

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleOccasionSelect = (occasion) => {
    setFormData((prev) => ({ ...prev, occasion }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLinkClick = (link) => {
    console.log("Navigating to:", link);
    window.open(link, "_blank");
  };

  return (
    <div className="questionnaire-container">
      <h2>Gift Recommendation</h2>

      <div className="input-section">
        <label>Interests:</label>
        <div className="button-group">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              className={`interest-btn ${
                formData.interests.includes(interest) ? "active" : ""
              }`}
              onClick={() => handleInterestToggle(interest)}
            >
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="input-section">
        <label>Budget:</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="e.g., 350"
          className="text-input"
        />
      </div>

      <div className="input-section">
        <label>Occasion:</label>
        <div className="button-group">
          {occasionOptions.map((occasion) => (
            <button
              key={occasion}
              className={`occasion-btn ${
                formData.occasion === occasion ? "active" : ""
              }`}
              onClick={() => handleOccasionSelect(occasion)}
            >
              {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="input-section">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="e.g., 30"
          className="text-input"
        />
      </div>

      <div className="recommendations-section">
        <h3>Recommendations ({recommendations.length} found)</h3>
        {recommendations.length === 0 ? (
          <p>
            No recommendations yet. Select interests and enter a budget to see
            suggestions.
          </p>
        ) : (
          recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <h4>{rec.name}</h4>
              <p>{rec.description}</p>
              <p>Price: ${rec.price}</p>
              <p>{rec.reason}</p>
              <a
                href={rec.shoppingLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(rec.shoppingLink);
                }}
                className="buy-btn"
              >
                Buy on Amazon
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
