import api from "./api";

interface IRegister {
  email: string;
  password: string;
}
interface ILogin {
  email: string;
  password: string;
}
export const registerTodos = async (body: IRegister) => {
  const { data } = await api.post(`auth/register`, body);
  return data;
};
export const login = async (body: ILogin) => {
  const { data } = await api.post(`auth/login`, body);
  return data;
};
