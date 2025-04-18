import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import api from '../api';

function AddStudent() {
  const navigate = useNavigate();

  const addStudent = async (data) => {
    await api.post('/', data);
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h3>Add Student</h3>
      <StudentForm onSubmit={addStudent} />
    </div>
  );
}

export default AddStudent;
