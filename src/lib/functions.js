import api from "./api";

function createStudentData(data) {
  return api.post("/student", data);
}

function getAllStudents() {
  return api.get("/student");
}

async function getAllAllotedStudents() {
  return api.get("/allotment");
}

function register(data) {
  return api.post("/user/register", data);
}

function updateStudentData(data, id) {
  return api.put(`/student/${id}`, data);
}

async function createAllotmentData(data) {
  return await api.post("/allotment", data);
}

export {
  createStudentData,
  getAllStudents,
  updateStudentData,
  register,
  createAllotmentData,
  getAllAllotedStudents,
};
