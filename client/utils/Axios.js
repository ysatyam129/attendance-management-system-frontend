import axios from "axios";
const Axios = axios.create({
  baseURL: "https://attendance-mangement.vercel.app/api/v1",
  withCredentials: true
});
export default Axios;