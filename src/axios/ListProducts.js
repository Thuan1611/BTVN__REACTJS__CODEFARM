const url = "https://api-class-o1lo.onrender.com/api/v1/todos";
export const fetchData = async (query) => {
  const cleanUpParams = Object.entries(query)
    .filter(([key, value]) => {
      void key; 
      return Boolean(value);
    })
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const respone = await fetch(`${url}?${cleanUpParams}`);
  const data = await respone.json();
  return data;
};

export const fetchDataDetail = async (id) => {
  const respone = await fetch(`${url}/${id}`);
  const data = await respone.json();
  return data;
};
