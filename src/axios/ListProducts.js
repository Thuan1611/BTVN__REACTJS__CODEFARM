import api from "./api";

export const fetchData = async (query) => {
  const cleanUpParams = Object.entries(query)
    .filter(([key, value]) => {
      void key;
      return Boolean(value);
    })
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const { data } = await api.get(`products?${cleanUpParams}`);
  return data;
};

export const fetchDataDetail = async (id) => {
  const { data } = await api.get(`products/${id}`);
  return data;
};
export const createData = async (body) => {
  return await api.post("products", body);
};
export const deleteData = async (id) => {
  return await api.delete(`products/${id}`);
};
export const updateData = async (id, body) => {
  return await api.put(`products/${id}`, body);
};
