import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

const authAPI = {
  getUsers() {
    return instance.get(`users`);
  },
};

export default authAPI;
