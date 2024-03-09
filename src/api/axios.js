import axios from "axios";
export default axios.create({
  baseURL: "https://book-vue-backend.onrender.com",
  // baseURL: "https://localhost:5005",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
