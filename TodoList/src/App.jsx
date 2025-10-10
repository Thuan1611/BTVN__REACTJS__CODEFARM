import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import Tbody from "./Tbody";
import axios from "axios";
import PagiNation from "./PagiNation";
function App() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const url = "https://api-class-o1lo.onrender.com/api/v1/todos";
  const fetchData = async () => {
    const respone = await axios.get(
      `${url}?q=${searchValue || ""}&_limit=${limit}&_page=${page}&_sort=${
        sort || "id"
      }&_order=${order || "desc"}`
    );
    setProducts(respone.data);
    setMeta(respone.data.meta);
  };
  useEffect(() => {
    fetchData();
  }, [searchValue, limit, page, sort, order]);
  const handleSort = (value) => {
    setSort(value.split(" ")[0]);
    setOrder(value.split(" ")[1]);
  };
  return (
    <>
      <div>
        <div className="bg-gray-100 min-h-screen p-8">
          {/* Tìm kiếm */}
          <div className="pl-10 mb-6 flex gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm "
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button className="px-4 py-2 button-primary">Tìm kiếm</button>
            <select
              name=""
              id=""
              className="bg-indigo-600 text-white rounded-lg "
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="id desc"></option>
              <option value="priority desc">Priority (Giảm dần)</option>
              <option value="priority asc">Priority (Tăng dần)</option>
            </select>
          </div>
          {/* Table */}
          <div className="container mx-auto">
            <div className="overflow-x-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-lg">
                  <tr>
                    <th className="th">Name</th>
                    <th className="th">Completed</th>
                    <th className="th">Description</th>
                    <th className="th">Priority</th>
                    <th className="th">DueDate</th>
                    <th className="th">Actions</th>
                  </tr>
                </thead>
                <Tbody products={products} />
              </table>
              <PagiNation meta={meta} page={page} setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
