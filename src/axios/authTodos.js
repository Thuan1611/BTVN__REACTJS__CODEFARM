import api from "./api";
const url = "https://api-class-o1lo.onrender.com/api/v1";

export const registerTodos = (body) => {
  const { data } = api.post(`${url}/register`, body);
  return data;
};
export const login = (body) => {
  const { data } = api.post(`${url}/login`,body);
  return data;
};