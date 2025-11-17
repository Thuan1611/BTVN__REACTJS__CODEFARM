import { ITodos } from "../types/ITodos";
import api from "./api";
export const fetchData = async () => {
  const { data } = await api.get(`products`);
  return data;
};
export const fetchDataDetail = async (id: string | number) => {
  const { data } = await api.get(`products/${id}`);
  return data;
};
export const createData = async (body: ITodos) => {
  return await api.post("products", body);
};
export const deleteData = async (id: string | number) => {
  return await api.delete(`products/${id}`);
};
export const updateData = async (id: string | number, body: ITodos) => {
  return await api.put(`products/${id}`, body);
};
