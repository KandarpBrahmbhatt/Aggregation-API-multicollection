import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/new", // change if needed
});

export const fetchSchools = () =>
  API.get(`/schools`);

export const fetchBranches = (schoolName) =>
  API.get(`/branches?schoolName=${schoolName || ""}`);


export const fetchClasses = (schoolName,branchName,standard)=>{
  API.get(`/getStudentsWithMarks?branchName=${branchName}&schoolName=${schoolName}&standard=${standard}`)
}
export default API;