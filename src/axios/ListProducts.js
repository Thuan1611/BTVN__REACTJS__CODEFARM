import api from "./api";

const url = "https://api-class-o1lo.onrender.com/api/v1/todos";
export const fetchData = async (query) => {
  const cleanUpParams = Object.entries(query)
    .filter(([key, value]) => {
      void key;
      return Boolean(value);
    })
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const { data } = await api.get(`${url}?${cleanUpParams}`);
  return data;
};

export const fetchDataDetail = async (id) => {
  const { data } = await api.get(`${url}/${id}`);
  return data;
};
export const createData = async (body) => {
 return await api.post(`${url}`, body);
};
export const deleteData = async (id) => {
 return await api.delete(`${url}/${id}`);
};
export const updateData = async (id,body) => {
 return await api.put(`${url}/${id}`,body);
};