import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API = "https://ems-backend-0ks4.onrender.com/api/employees";

  const loadEmployees = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ name: "", email: "", role: "" });
      loadEmployees();
    } catch (err) {
      console.error("Error adding employee", err);
    }
  };

  const openEditModal = (emp) => {
    setForm({
      name: emp.name,
      email: emp.email,
      role: emp.role,
    });
    setEditId(emp.id);
    setShowModal(true);
  };

  const updateEmployee = async () => {
    try {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setShowModal(false);
      setEditId(null);
      setForm({ name: "", email: "", role: "" });

      loadEmployees();
    } catch (err) {
      console.error("Error updating employee", err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      loadEmployees();
    } catch (err) {
      console.error("Error deleting employee", err);
    }
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      {/* Add Employee */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Employee Role"
          value={form.role}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Employee</button>
      </form>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <button
                  className="edit"
                  onClick={() => openEditModal(emp)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT POPUP */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Employee</h2>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
            />

            <div className="modal-buttons">
              <button className="update" onClick={updateEmployee}>
                Update
              </button>

              <button
                className="cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;