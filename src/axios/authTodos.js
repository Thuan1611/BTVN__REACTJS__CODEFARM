import api from "./api";

export const registerTodos = async (body) => {
  const { data } = await api.post(`auth/register`, body);
  return data;
};
export const login = async (body) => {
  const { data } = await api.post(`auth/login`, body);
  return data;
};
