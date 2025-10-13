import React, { useEffect, useState } from "react";
import { fetchData } from "../axios/ListProducts";
import Tbody from "../components/Tbody";
import PagiNation from "../components/PagiNation";

const TodosList = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [query, setQuery] = useState({
    _page: 1,
    _limit: 10,
  });
  useEffect(() => {
    const loadData = async () => {
      const respone = await fetchData(query);
      setProducts(respone?.data);
      setMeta(respone?.meta);
    };
    loadData();
  }, [query]);
  return (
    <div>
      <div className="bg-gray-100 min-h-screen p-8 ">
        {/* Tìm kiếm */}
        <div className="pl-10 mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm "
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code == "Enter") {
                return setQuery({ ...query, q: searchValue });
              }
            }}
          />
          <button
            className="px-4 py-2 button-primary"
            onClick={() => setQuery({ ...query, q: searchValue })}
          >
            Tìm kiếm
          </button>
          <select
            name=""
            id=""
            className="bg-indigo-600 text-white rounded-lg "
            onChange={(e) =>
              setQuery({
                ...query,
                _sort: e.target.value.split(" ")[0],
                _order: e.target.value.split(" ")[1],
              })
            }
          >
            <option value="name desc">Mặc định</option>
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
            <PagiNation meta={meta} query={query} setQuery={setQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosList;
