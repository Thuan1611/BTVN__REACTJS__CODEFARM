import React from "react";
import { Link } from "react-router-dom";
import { handleCompleted, handlePriority } from "../ultils/handlePriority";

const Tbody = ({ products }) => {
  //Completed: Quá hạn
  return (
    <tbody className="text-gray-700">
      {products?.length > 0 ? (
        products?.map((item) => {
          return (
            <tr key={item._id}>
              <td className="py-4 px-6">{item.name}</td>
              <td className="py-4 px-6">{handleCompleted(item)}</td>
              <td className="py-4 px-6">{item.description}</td>
              <td className="py-4 px-6">{handlePriority(item.priority)}</td>
              <td className="py-4 px-6">{item.dueDate.slice(0, 10)}</td>
              <td className="py-4 px-6 flex gap-2 ">
                <button className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg font-medium">
                  Sửa
                </button>
                <button className="px-4 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-200 shadow-md hover:shadow-lg font-medium">
                  <Link to={`${item._id}`}> Chi tiết</Link>
                </button>
                <button className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-md hover:shadow-lg font-medium">
                  Xóa
                </button>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td className="py-4 px-6">
            <p>....Loading</p>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Tbody;
