import React from "react";

const Tbody = ({ products }) => {
  //Completed: Quá hạn
  const handleCompleted = (item) => {
    const today = Date.now();
    const dueDate = new Date(item.dueDate);
    const isCheckCompleted = !item.completed && today > dueDate;
    if (item.completed) return "Hoàn thành";
    if (isCheckCompleted) return "Quá Hạn";
    return "Chưa hoàn thành ";
  };

  //CheckPriority
  const handlePriority = (priority) => {
    if (Number(priority) === 1) return "Thấp";
    if (Number(priority) === 2) return "Bình thường";
    return "Khẩn cấp";
  };
  
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
                <button className="px-4 py-1.5 button-primary rounded-full ">
                  Sửa
                </button>
                <button className="px-4 py-1.5 bg-red-500 text-white rounded-full transition hover:bg-indigo-600 duration-200 shadow-sm">
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
