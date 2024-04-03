import axios from "axios";

function updateStudentData(data) {
  return axios.post("http://localhost:5000/student", data);
}

export { updateStudentData };
