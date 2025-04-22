import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';

function StudentTable() {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Store the debounced search term
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [message, setMessage] = useState(location.state?.message || '');
  const [error, setError] = useState(location.state?.error || '');
  const limit = 10;

  // Handle the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search); // Set the debounced search value
    }, 500); // Wait for 500ms after the user stops typing

    return () => clearTimeout(timer); // Clear the timeout on every render to restart debounce
  }, [search]);

  // Fetch students based on the page and search query
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get(`?page=${page}&limit=${limit}&search=${debouncedSearch}`);
        setStudents(res.data);
        setHasMore(res.data.length === limit);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        setError('Failed to load student data. Please try again later.');
      }
    };

    fetchStudents();
  }, [page, debouncedSearch]); // Trigger when page or debouncedSearch changes

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/${id}`);
      const res = await api.get(`?page=${page}&limit=${limit}&search=${debouncedSearch}`);
      setStudents(res.data);
      setHasMore(res.data.length === limit);
      setMessage('Student record deleted');
    } catch (err) {
      setError('Failed to delete student. Please try again.');
    }
  };

  // Clear message/error after the first load
  useEffect(() => {
    if (location.state?.message || location.state?.error) {
      // Clear message/error from the history after first load
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.message, location.state?.error]); // Add dependencies

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
      setError('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, error]);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    s.course.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Student Management</h2>
        <Link to="/add" className="btn btn-success">Add Student</Link>
      </div>

      <input
        className="form-control my-3"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search state
      />
      {message && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
        </div>
      )}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Course</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s, index) => (
            <tr key={s.id}>
              <td>{(page - 1) * limit + index + 1}</td>
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
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          disabled={!hasMore}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentTable;
