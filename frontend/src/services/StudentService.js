import axios from "axios";

const API = "http://localhost:8080/student";

export const getStudents = () => axios.get(API + "/all");

export const addStudent = (student) =>
    axios.post(API + "/save", student);

export const updateStudent = (id, student) =>
    axios.put(API + "/update/" + id, student);

export const deleteStudent = (id) =>
    axios.delete(API + "/delete/" + id);