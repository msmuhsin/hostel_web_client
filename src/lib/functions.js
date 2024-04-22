import axios from "axios";

function createStudentData(data) {
  return axios.post("http://localhost:5000/student", data);
}

function getAllStudents() {
  return axios.get("http://localhost:5000/student");
}

function updateStudentData(data, id) {
  return axios.put(`http://localhost:5000/student/${id}`, data);
}


export { createStudentData, getAllStudents, updateStudentData };
