import React from "react";
import { useNavigate } from "react-router-dom";
import "./Questionnaire.css";

const InterestsPage = ({ formData, setFormData }) => {
  const navigate = useNavigate();
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
    "Eating",
  ];

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleNext = () => {
    navigate("/budget-age");
  };

  return (
    <div className="questionnaire-container">
      <h2>Select Interests</h2>
      <div className="input-section">
        <label>Choose Your Interests:</label>
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
      <div className="navigation-buttons">
        <button className="next-btn" onClick={handleNext}>
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default InterestsPage;
