// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RecommendationsPage = ({ formData }) => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [error, setError] = useState(null);
//   const [feedbacks, setFeedbacks] = useState({}); // Store feedback per recommendation

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       const data = {
//         interests: formData.interests || [],
//         budget: Number(formData.budget) || 0,
//         occasion: formData.occasion || "",
//         age: Number(formData.age) || 0,
//       };
//       console.log(
//         "Sending recommendation request:",
//         JSON.stringify(data, null, 2)
//       );
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/api/gifts/recommend",
//           data
//         );
//         console.log("Received recommendations:", response.data);
//         setRecommendations(response.data);
//         // Initialize feedback state for each recommendation
//         const initialFeedbacks = response.data.reduce((acc, rec) => {
//           acc[rec._id] = { rating: 0, comment: "" };
//           return acc;
//         }, {});
//         setFeedbacks(initialFeedbacks);
//       } catch (error) {
//         console.error("Recommendation fetch error:", error.message);
//         setError(`Failed to fetch recommendations: ${error.message}`);
//       }
//     };
//     fetchRecommendations();
//   }, [formData]);

//   const handleSubmitFeedback = async (recId) => {
//     console.log("Submitting feedback for recId:", recId); // Debug click
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("No authentication token found. Please log in again.");
//       return;
//     }

//     const tokenParts = token.split(".");
//     if (tokenParts.length !== 3) {
//       setError("Invalid token format. Please log in again.");
//       return;
//     }

//     const feedback = feedbacks[recId];
//     console.log(
//       `Submitting feedback with token:`,
//       token.substring(0, 20) + "..."
//     );
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/feedback",
//         {
//           userInput: formData,
//           recommendation: recommendations.find(
//             (r) => r._id.toString() === recId.toString()
//           ) || { name: "Unknown", price: 0 },
//           rating: Number(feedback.rating),
//           comment: feedback.comment,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Feedback response:", response.data);
//       alert(
//         `Feedback submitted successfully for ${
//           recommendations.find((r) => r._id.toString() === recId.toString())
//             ?.name
//         }!`
//       );
//       setFeedbacks((prev) => ({
//         ...prev,
//         [recId]: { rating: 0, comment: "" },
//       }));
//       setError(null);
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message || err.message || "Unknown error";
//       setError(`Failed to submit feedback: ${errorMessage}`);
//       console.error("Feedback error details:", {
//         status: err.response?.status,
//         data: err.response?.data,
//         message: err.message,
//       });
//     }
//   };

//   const handleFeedbackChange = (recId, field, value) => {
//     setFeedbacks((prev) => ({
//       ...prev,
//       [recId]: { ...prev[recId], [field]: value },
//     }));
//   };

//   return (
//     <div className="questionnaire-container">
//       <h2>Recommendations</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {recommendations.length > 0 ? (
//         <div className="recommendation-list">
//           {recommendations.map((rec) => (
//             <div key={rec._id} className="recommendation-box">
//               <h3>{rec.name}</h3>
//               <p>
//                 <strong>Reason:</strong>{" "}
//                 {rec.description || "Great choice for your occasion!"}
//               </p>
//               {rec.shoppingLink && (
//                 <a
//                   href={rec.shoppingLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="shop-link"
//                 >
//                   Buy Now
//                 </a>
//               )}
//               <div className="feedback-section">
//                 <div className="input-group">
//                   <label>Rating (0-5)</label>
//                   <input
//                     type="number"
//                     value={feedbacks[rec._id]?.rating || 0}
//                     onChange={(e) =>
//                       handleFeedbackChange(rec._id, "rating", e.target.value)
//                     }
//                     min="0"
//                     max="5"
//                     required
//                     className="rating-input"
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label>Comment</label>
//                   <textarea
//                     value={feedbacks[rec._id]?.comment || ""}
//                     onChange={(e) =>
//                       handleFeedbackChange(rec._id, "comment", e.target.value)
//                     }
//                     required
//                     className="comment-input"
//                   />
//                 </div>
//                 <button
//                   onClick={() => handleSubmitFeedback(rec._id)}
//                   className="next-btn"
//                 >
//                   Submit Feedback
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No recommendations available.</p>
//       )}
//     </div>
//   );
// };

// export default RecommendationsPage;
import React, { useState, useEffect } from "react";
import axios from "axios";

const RecommendationsPage = ({ formData }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState({}); // Store feedback per recommendation

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = {
        interests: formData.interests || [],
        budget: Number(formData.budget) || 0,
        occasion: formData.occasion || "",
        age: Number(formData.age) || 0,
      };
      console.log(
        "Sending recommendation request:",
        JSON.stringify(data, null, 2)
      );
      try {
        const response = await axios.post(
          "http://localhost:5000/api/gifts/recommend",
          data
        );
        console.log("Received recommendations:", response.data);
        setRecommendations(response.data);
        const initialFeedbacks = response.data.reduce((acc, rec) => {
          acc[rec._id] = { rating: 0, comment: "" };
          return acc;
        }, {});
        setFeedbacks(initialFeedbacks);
      } catch (error) {
        console.error("Recommendation fetch error:", error.message);
        setError(`Failed to fetch recommendations: ${error.message}`);
      }
    };
    fetchRecommendations();
  }, [formData]);

  const handleSubmitFeedback = async (recId) => {
    console.log("Submitting feedback for recId:", recId);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in again.");
      return;
    }

    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      setError("Invalid token format. Please log in again.");
      return;
    }

    const feedback = feedbacks[recId];
    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback",
        {
          userInput: formData,
          recommendation: recommendations.find(
            (r) => r._id.toString() === recId.toString()
          ) || { name: "Unknown", price: 0 },
          rating: Number(feedback.rating),
          comment: feedback.comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Feedback response:", response.data);
      alert(
        `Feedback submitted successfully for ${
          recommendations.find((r) => r._id.toString() === recId.toString())
            ?.name
        }!`
      );
      setFeedbacks((prev) => ({
        ...prev,
        [recId]: { rating: 0, comment: "" },
      }));
      setError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Unknown error";
      setError(`Failed to submit feedback: ${errorMessage}`);
      console.error("Feedback error details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
    }
  };

  const handleFeedbackChange = (recId, field, value) => {
    setFeedbacks((prev) => ({
      ...prev,
      [recId]: { ...prev[recId], [field]: value },
    }));
  };

  return (
    <div className="questionnaire-container">
      <h2>Recommendations</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recommendations.length > 0 ? (
        <div className="recommendation-list">
          {recommendations.map((rec) => (
            <div key={rec._id} className="recommendation-box">
              <h3>{rec.name}</h3>
              <p>
                <strong>Reason:</strong>{" "}
                {rec.description || "Great choice for your occasion!"}
              </p>
              {rec.shoppingLink && (
                <a
                  href={rec.shoppingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shop-link"
                >
                  Buy Now
                </a>
              )}
              <div className="feedback-section">
                <div className="input-group">
                  <label>Rating (0-5)</label>
                  <input
                    type="number"
                    value={feedbacks[rec._id]?.rating || 0}
                    onChange={(e) =>
                      handleFeedbackChange(rec._id, "rating", e.target.value)
                    }
                    min="0"
                    max="5"
                    required
                    className="rating-input"
                  />
                </div>
                <div className="input-group">
                  <label>Comment</label>
                  <textarea
                    value={feedbacks[rec._id]?.comment || ""}
                    onChange={(e) =>
                      handleFeedbackChange(rec._id, "comment", e.target.value)
                    }
                    required
                    className="comment-input"
                  />
                </div>
                <button
                  onClick={() => handleSubmitFeedback(rec._id)}
                  className="next-btn"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default RecommendationsPage;
