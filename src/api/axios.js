import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5005",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
