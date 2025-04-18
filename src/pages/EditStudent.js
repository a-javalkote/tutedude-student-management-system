import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import api from '../api';

function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/${id}`).then((res) => setStudent(res.data));
  }, [id]);

  const updateStudent = async (data) => {
    await api.put(`/${id}`, data);
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h3>Edit Student</h3>
      {student && <StudentForm initialData={student} onSubmit={updateStudent} />}
    </div>
  );
}

export default EditStudent;
