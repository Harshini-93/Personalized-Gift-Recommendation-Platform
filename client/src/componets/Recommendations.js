import React from "react";

const Recommendations = ({ recommendations }) => {
  return (
    <div>
      <h2>Recommended Gifts</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((gift, index) => (
            <li key={index}>
              <strong>{gift.name}</strong> - ${gift.price}
              <br />
              {gift.description}
              <br />
              <em>Reason: {gift.reason}</em>
            </li>
          ))}
        </ul>
      ) : (
        <p>Fill out the questionnaire to see recommendations!</p>
      )}
    </div>
  );
};

export default Recommendations;
