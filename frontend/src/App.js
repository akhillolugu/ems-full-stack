import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [editId, setEditId] = useState(null);

  // API URL from .env with fallback
  const API =
    "https://ems-backend-0ks4.onrender.com/api/employees" ||
    "http://localhost:8080/api/employees";

  // Fetch employees
  const loadEmployees = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API}/${editId}` : API;

      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ name: "", email: "", role: "" });
      setEditId(null);
      loadEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // Edit employee
  const editEmployee = (emp) => {
    setForm({
      name: emp.name,
      email: emp.email,
      role: emp.role,
    });
    setEditId(emp.id);
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      loadEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

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

        <button type="submit">
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

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
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5">No employees found</td>
            </tr>
          ) : (
            employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>
                  <button
                    className="edit"
                    onClick={() => editEmployee(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteEmployee(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;