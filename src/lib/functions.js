import axios from "axios";

function createStudentData(data) {
  return axios.post("http://localhost:5000/student", data);
}

function getAllStudents() {
  return axios.get("http://localhost:5000/student");
}

export { createStudentData, getAllStudents };
