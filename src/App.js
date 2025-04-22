import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import StudentTable from './pages/StudentTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
