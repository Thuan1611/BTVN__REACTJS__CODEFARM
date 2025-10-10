import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // api: https://api-class-o1lo.onrender.com/api/example/products
  // hiển thị danh sách sản phẩm từ api
  // Có phân trang, tìm kiếm bộ lọc khoảng giá, sắp xếp theo giá tiền
  // bài tập thực hành day 35
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState({
    searchValue: "",
    page: 1,
    limit: 10,
  });
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const respone = await fetch(
        `https://api-class-o1lo.onrender.com/api/example/products?searchValue=${searchValue}&_page=${query.page}&_limit=${query.limit}`
      ).then((res) => res.json());
      setProducts(respone);
    };
    fetchData();
  }, [query]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            onChange={(e) => setQuery({ searchValue: e.target.value,_page: 1, _limit: 10 })}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-lg "
            onClick={() => {
              setSearchValue((prev) => ({ ...prev, q: searchValue }));
            }}
          >
            Tìm kiếm
          </button>
        </div>
        <div className="container mx-auto">
          <div className="overflow-x-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">
                <tr>
                  <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider">
                    Title
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider">
                    Description
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider">
                    Category
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider">
                    Price
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider">
                    Discount Percentage
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {products?.data?.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-100`}
                  >
                    <td className="py-4 px-6">{item.title}</td>
                    <td className="py-4 px-6">
                      <img src={item.thumbnail} alt="" />
                    </td>
                    <td className="py-4 px-6">{item.description}</td>
                    <td className="py-4 px-6">{item.category}</td>
                    <td className="py-4 px-6">{item.price}</td>
                    <td className="py-4 px-6">{item.discountPercentage}%</td>
                    <td className="py-4 px-6 flex gap-2 !align-items-center !flex">
                      <button className="px-4 py-1.5 bg-indigo-500 text-indigo-600 rounded-full hover:bg-indigo-600 transition duration-200 shadow-sm">
                        Sửa
                      </button>
                      <button className="px-4 py-1.5 bg-red-500 text-indigo-600 rounded-full  transition duration-200 shadow-sm">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
