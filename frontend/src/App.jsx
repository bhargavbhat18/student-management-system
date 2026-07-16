import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./services/StudentService";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    getStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  };

  const addOrUpdate = (student) => {
    if (student.id) {
      updateStudent(student.id, student)
        .then(() => {
          loadStudents();
          setEditStudent(null);
        })
        .catch((error) => console.log(error));
    } else {
      addStudent(student)
        .then(() => loadStudents())
        .catch((error) => console.log(error));
    }
  };

  const edit = (student) => {
    setEditStudent(student);
  };

  const remove = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(id)
        .then(() => loadStudents())
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Management System</h2>

      <StudentForm
        addOrUpdate={addOrUpdate}
        editStudent={editStudent}
      />

      <StudentTable
        students={students}
        onEdit={edit}
        onDelete={remove}
      />
    </div>
  );
}

export default App;