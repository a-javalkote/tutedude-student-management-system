import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import api from '../api';

function AddStudent() {
  const navigate = useNavigate();

  const addStudent = async (data) => {
    try {
      await api.post('/', data);
      navigate('/', { state: { message: 'Student added successfully' } });
    } catch (error) {
      navigate('/', { state: { error: 'Failed to add student. Please try again.' } });
    }
  };
  return (
    <div className="container mt-4">
      <h3>Add Student</h3>
      <StudentForm onSubmit={addStudent} />
    </div>
  );
}

export default AddStudent;
