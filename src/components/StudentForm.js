import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  course: Yup.string().required('Course is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

function StudentForm({ initialData = {}, onSubmit }) {
  const defaultValues = {
    name: '',
    course: '',
    email: '',
    ...initialData,
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Form className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label>Name</label>
          <Field name="name" className="form-control" />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label>Course</label>
          <Field name="course" className="form-control" />
          <ErrorMessage name="course" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <Field name="email" type="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </Formik>
  );
}

export default StudentForm;