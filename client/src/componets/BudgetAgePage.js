import React from "react";
import { useNavigate } from "react-router-dom";
import "./Questionnaire.css";

const BudgetAgePage = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    navigate("/occasion");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="questionnaire-container">
      <h2>Set Budget & Age</h2>
      <div className="input-section">
        <label>Budget (in $):</label>
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

export default BudgetAgePage;
