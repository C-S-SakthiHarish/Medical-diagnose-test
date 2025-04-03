import React, { useState } from "react";
import "./App.css";
import Client from "./client"; // Default import

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
    duration: "",
    severity: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisReport, setDiagnosisReport] = useState(null);
  const [showForm, setShowForm] = useState(true); // State to control form visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowForm(false); // Hide the form

    try {
      // Call the Client function with payload and method
      const response = await Client(formData, "POST");

      if (!response || !response.report) {
        throw new Error("Failed to fetch diagnosis report");
      }

      // Set the diagnosis report in the state
      setDiagnosisReport(response.report);
    } catch (error) {
      console.error(error, "Error fetching diagnosis report");
      alert("Error fetching diagnosis report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // Reset the state to show the form and clear the report
    setShowForm(true);
    setDiagnosisReport(null);
    setFormData({
      name: "",
      age: "",
      gender: "",
      symptoms: "",
      duration: "",
      severity: "",
    });
  };

  return (
    <div className="app-container">
      {/* Conditionally render the form */}
      {showForm && (
        <>
          <h1>Medical Diagnosis Form</h1>
          <form onSubmit={handleSubmit} className="diagnosis-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Symptoms:</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Duration of Symptoms:</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 2 days"
                required
              />
            </div>

            <div className="form-group">
              <label>Severity:</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Severity</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Generating Report..." : "Generate Diagnosis Report"}
            </button>
          </form>
        </>
      )}

      {/* Show the loader while waiting for the API response */}
      {isLoading && <div className="loader">Loading...</div>}

      {/* Show the diagnosis report after receiving the response */}
      {diagnosisReport && (
        <div className="diagnosis-report">
          {/* Back Button */}
          <button className="back-button" onClick={handleBack}>
            ← Back to Form
          </button>
          <h2>Diagnosis Report</h2>
          <p>{diagnosisReport}</p>
        </div>
      )}
    </div>
  );
}

export default App;