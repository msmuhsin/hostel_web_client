import api from "./api";

function createStudentData(data) {
  return api.post("/student", data);
}

function getAllStudents() {
  return api.get("/student");
}

function register(data) {
  return api.post("/user/register", data);
}

function updateStudentData(data, id) {
  return api.put(`/student/${id}`, data);
}

export { createStudentData, getAllStudents, updateStudentData, register };
