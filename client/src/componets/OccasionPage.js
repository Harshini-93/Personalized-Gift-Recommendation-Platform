import React from "react";
import { useNavigate } from "react-router-dom";
import "./Questionnaire.css";

const OccasionPage = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const occasionOptions = [
    "birthday",
    "promotion",
    "marriage",
    "anniversary",
    "holiday",
  ];

  const handleOccasionSelect = (occasion) => {
    setFormData((prev) => ({ ...prev, occasion }));
  };

  const handleNext = () => {
    navigate("/recommendations");
  };

  const handleBack = () => {
    navigate("/budget-age");
  };

  return (
    <div className="questionnaire-container">
      <h2>Choose Occasion</h2>
      <div className="input-section">
        <label>Select an Occasion:</label>
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
      <div className="navigation-buttons">
        <button className="back-btn" onClick={handleBack}>
          Back
        </button>
        <button className="next-btn" onClick={handleNext}>
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default OccasionPage;
