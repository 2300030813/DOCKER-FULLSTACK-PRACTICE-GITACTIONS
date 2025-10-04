import { useState, useEffect } from "react";
import "./App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/patientapi`; // Use environment variable

function App() {
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    disease: "",
    email: "",
    contact: ""
  });
  const [message, setMessage] = useState("");

  // Load patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch all patients
  const fetchPatients = () => {
    fetch(`${API_URL}/all`)
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error("Fetch patients failed:", err));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Reset form
  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      age: "",
      gender: "",
      disease: "",
      email: "",
      contact: ""
    });
    setEditPatient(null);
  };

  // Add or update patient
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.id || !form.name) {
      setMessage("Please fill in at least ID and Name.");
      return;
    }

    if (editPatient) {
      // Update patient
      fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(() => {
          setMessage("Patient updated successfully!");
          resetForm();
          fetchPatients();
        })
        .catch(err => setMessage("Update failed: " + err.message));
    } else {
      // Add new patient
      fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(() => {
          setMessage("Patient added successfully!");
          resetForm();
          fetchPatients();
        })
        .catch(err => setMessage("Add failed: " + err.message));
    }
  };

  // Edit a patient
  const handleEdit = (patient) => {
    setEditPatient(patient);
    setForm(patient);
    setMessage("");
  };

  // Delete a patient
  const handleDelete = (id) => {
    fetch(`${API_URL}/delete/${id}`, { method: "DELETE" })
      .then(() => {
        setMessage("Patient deleted successfully!");
        fetchPatients();
      })
      .catch(err => setMessage("Delete failed: " + err.message));
  };

  return (
    <div className="App">
      <h1>Patient Management</h1>

      <h2>{editPatient ? "Edit Patient" : "Add Patient"}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="Patient ID"
          value={form.id}
          onChange={handleChange}
          disabled={!!editPatient}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="disease"
          placeholder="Disease"
          value={form.disease}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
        />
        <button type="submit">
          {editPatient ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <h2>Patient List</h2>
      {patients.length === 0 ? (
        <p>No patients available</p>
      ) : (
        patients.map((patient) => (
          <div key={patient.id} className="patient-item">
            <div>
              <h3>{patient.name} (ID: {patient.id})</h3>
              <p>Age: {patient.age}</p>
              <p>Gender: {patient.gender}</p>
              <p>Email: {patient.email}</p>
              <p>Contact: {patient.contact}</p>
              <p>Disease: {patient.disease}</p>
            </div>
            <div className="buttons">
              <button onClick={() => handleEdit(patient)}>Edit</button>
              <button
                className="delete"
                onClick={() => handleDelete(patient.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
