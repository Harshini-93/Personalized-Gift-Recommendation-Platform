// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   useLocation,
//   Link,
// } from "react-router-dom";
// import InterestsPage from "./components/InterestsPage";
// import BudgetAgePage from "./components/BudgetAgePage";
// import OccasionPage from "./components/OccasionPage";
// import RecommendationsPage from "./components/RecommendationsPage";
// import LoginPage from "./components/LoginPage";
// import RegisterPage from "./components/RegisterPage";
// import AdminGiftsPage from "./components/AdminGiftsPage";
// import ProfilePage from "./components/ProfilePage";
// import { jwtDecode } from "jwt-decode";
// import "./App.css";
// import "./components/Questionnaire.css";

// const NavBar = () => {
//   const location = useLocation();
//   const token = localStorage.getItem("token");
//   const isAuthenticated = !!token;
//   const decoded = token ? jwtDecode(token) : null;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const steps = [
//     { path: "/interests", label: "Interests" },
//     { path: "/budget-age", label: "Budget/Age" },
//     { path: "/occasion", label: "Occasion" },
//     { path: "/recommendations", label: "Recommendations" },
//   ];

//   return (
//     <nav className="navbar">
//       <div className="nav-steps">
//         {steps.map((step) => (
//           <Link
//             key={step.path}
//             to={step.path}
//             className={`nav-item ${
//               location.pathname === step.path ? "active" : ""
//             }`}
//           >
//             {step.label}
//           </Link>
//         ))}
//       </div>
//       {isAuthenticated && (
//         <div
//           className="nav-auth"
//           style={{ display: "flex", alignItems: "center" }}
//         >
//           <Link
//             to="/profile"
//             className={`nav-item ${
//               location.pathname === "/profile" ? "active" : ""
//             }`}
//             style={{ marginRight: "15px" }}
//           >
//             👤 Profile
//           </Link>
//           <a href="#" className="nav-item" onClick={handleLogout}>
//             🚪 Logout
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// };

// const ProtectedRoute = ({ children, role }) => {
//   const token = localStorage.getItem("token");
//   const isAuthenticated = !!token;
//   if (!isAuthenticated) return <Navigate to="/login" />;
//   const decoded = token ? jwtDecode(token) : null;
//   if (role && decoded?.role !== role) return <Navigate to="/interests" />;
//   return children;
// };

// const AdminRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" />;
//   const decoded = jwtDecode(token);
//   if (decoded.role !== "admin") return <Navigate to="/interests" />;
//   return children;
// };

// function App() {
//   const [formData, setFormData] = useState({
//     interests: [],
//     budget: "",
//     age: "",
//     occasion: "",
//   });

//   return (
//     <Router>
//       <div className="app-container">
//         <header className="app-header">
//           <h1>Gift Recommendation</h1>
//         </header>
//         <NavBar />
//         <main className="page-content">
//           <Routes>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route
//               path="/interests"
//               element={
//                 <ProtectedRoute>
//                   <InterestsPage
//                     formData={formData}
//                     setFormData={setFormData}
//                   />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/budget-age"
//               element={
//                 <ProtectedRoute>
//                   <BudgetAgePage
//                     formData={formData}
//                     setFormData={setFormData}
//                   />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/occasion"
//               element={
//                 <ProtectedRoute>
//                   <OccasionPage formData={formData} setFormData={setFormData} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/recommendations"
//               element={
//                 <ProtectedRoute>
//                   <RecommendationsPage formData={formData} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/gifts"
//               element={
//                 <AdminRoute>
//                   <AdminGiftsPage />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <ProfilePage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/" element={<Navigate to="/login" />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";
import InterestsPage from "./components/InterestsPage";
import BudgetAgePage from "./components/BudgetAgePage";
import OccasionPage from "./components/OccasionPage";
import RecommendationsPage from "./components/RecommendationsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminGiftsPage from "./components/AdminGiftsPage";
import ProfilePage from "./components/ProfilePage";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import icons
import "./App.css";
import "./components/Questionnaire.css";

const NavBar = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const decoded = token ? jwtDecode(token) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const steps = [
    { path: "/interests", label: "Interests" },
    { path: "/budget-age", label: "Budget/Age" },
    { path: "/occasion", label: "Occasion" },
    { path: "/recommendations", label: "Recommendations" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-steps">
        {steps.map((step) => (
          <Link
            key={step.path}
            to={step.path}
            className={`nav-item ${
              location.pathname === step.path ? "active" : ""
            }`}
          >
            {step.label}
          </Link>
        ))}
      </div>
      {isAuthenticated && (
        <div
          className="nav-auth"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link
            to="/profile"
            className={`nav-item ${
              location.pathname === "/profile" ? "active" : ""
            }`}
            style={{ marginRight: "15px" }}
          >
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
          <a href="#" className="nav-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </a>
        </div>
      )}
    </nav>
  );
};

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  if (!isAuthenticated) return <Navigate to="/login" />;
  const decoded = token ? jwtDecode(token) : null;
  if (role && decoded?.role !== role) return <Navigate to="/interests" />;
  return children;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  const decoded = jwtDecode(token);
  if (decoded.role !== "admin") return <Navigate to="/interests" />;
  return children;
};

function App() {
  const [formData, setFormData] = useState({
    interests: [],
    budget: "",
    age: "",
    occasion: "",
  });

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Gift Recommendation</h1>
        </header>
        <NavBar />
        <main className="page-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/interests"
              element={
                <ProtectedRoute>
                  <InterestsPage
                    formData={formData}
                    setFormData={setFormData}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget-age"
              element={
                <ProtectedRoute>
                  <BudgetAgePage
                    formData={formData}
                    setFormData={setFormData}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/occasion"
              element={
                <ProtectedRoute>
                  <OccasionPage formData={formData} setFormData={setFormData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommendations"
              element={
                <ProtectedRoute>
                  <RecommendationsPage formData={formData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gifts"
              element={
                <AdminRoute>
                  <AdminGiftsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
