import axios from "axios";
export default axios.create({
  baseURL: "https://book-vue-backend.onrender.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
