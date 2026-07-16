import { useState, useEffect } from "react";

function StudentForm({ addOrUpdate, editStudent }) {
  const [student, setStudent] = useState({
    name: "",
    java: "",
    python: "",
  });

  useEffect(() => {
    if (editStudent) {
      setStudent(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdate(student);

    setStudent({
      name: "",
      java: "",
      python: "",
    });
  };

  return (
    <div className="card p-4 shadow mt-4">
      <h3 className="mb-3">
        {editStudent ? "Update Student" : "Add Student"}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Student Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Java Marks"
            name="java"
            value={student.java}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Python Marks"
            name="python"
            value={student.python}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          {editStudent ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;