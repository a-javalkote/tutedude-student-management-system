import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 5;

  const getStudents = async () => {
    const res = await api.get(`?page=${page}&limit=${limit}`);
    setStudents(res.data);
  };

  useEffect(() => {
    getStudents();
  }, [page]);

  const deleteStudent = async (id) => {
    await api.delete(`/${id}`);
    getStudents();
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Student Management</h2>
        <Link to="/add" className="btn btn-success">Add Student</Link>
      </div>

      <input
        className="form-control my-3"
        placeholder="Search by name or course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>{s.email}</td>
              <td>
                <Link to={`/edit/${s.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => deleteStudent(s.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <button className="btn btn-secondary" onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default StudentTable;
