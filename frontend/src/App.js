import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:8080/api/employees";

  // Fetch employees
  const loadEmployees = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Handle form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  // Edit employee
  const editEmployee = (emp) => {
    setForm(emp);
    setEditId(emp.id);
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadEmployees();
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
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
              <td>
                <button className="edit" onClick={() => editEmployee(e)}>Edit</button>
                <button className="delete" onClick={() => deleteEmployee(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
