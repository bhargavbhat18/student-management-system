import { useEffect, useState } from "react";


import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    searchStudents,
} from "./services/StudentService";

function App() {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [editStudent, setEditStudent] = useState(null);

    useEffect(() => {
        loadStudents();
    }, [page]);

    const loadStudents = () => {
        getStudents(page, 10)
            .then((response) => {
                setStudents(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => console.log(error));
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setKeyword(value);

        if (value.trim() === "") {
            loadStudents();
        } else {
            searchStudents(value)
                .then((response) => {
                    setStudents(response.data);
                })
                .catch((error) => console.log(error));
        }
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

    const clearSearch = () => {
        setKeyword("");
        loadStudents();
    };

    return (
        <div className="container py-5">

            <h2 className="text-center fw-bold mb-4">
                🎓 Student Management System
            </h2>

            <StudentForm
                addOrUpdate={addOrUpdate}
                editStudent={editStudent}
            />

            {/* Search Card */}
            <div className="card shadow-sm border-0 mt-4 mb-4">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">
                            🔍 Search Student
                        </h5>

                        {keyword && (
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={clearSearch}
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="input-group input-group-lg">

            <span className="input-group-text bg-primary text-white">
              🔍
            </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search student by name..."
                            value={keyword}
                            onChange={handleSearch}
                        />

                    </div>

                </div>
            </div>

            <StudentTable
                students={students}
                onEdit={edit}
                onDelete={remove}
            />

            {keyword === "" && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">

                        <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${page === index ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setPage(index)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </li>

                    </ul>
                </nav>
            )}

        </div>
    );
}

export default App;


