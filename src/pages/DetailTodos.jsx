import React, { useEffect, useState } from "react";
import { fetchDataDetail } from "../axios/ListProducts";
import { Link, useParams } from "react-router-dom";
import { Card } from "antd";
import { handleCompleted, handlePriority } from "../ultils/handlePriority";

const DetailTodos = () => {
  const { id } = useParams();
  const [products, setProduct] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await fetchDataDetail(id);
      setProduct(data);
    };
    loadData();
  }, [id]);

  return (
    <div className=" min-h-screen bg-gray-100">
      <Card
        title={
          <span className="text-lg font-semibold text-indigo-600">
            Chi tiết công việc
          </span>
        }
        style={{
          width: 500,
          borderRadius: 12,
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold text-gray-800">Tên: </span>
            {products?.name}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Mô tả: </span>
            {products?.description}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Độ ưu tiên: </span>
            <span className="text-blue-600">
              {handlePriority(products?.priority)}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-800">Trạng thái: </span>
            {handleCompleted(products?.completed)}
          </p>
        </div>
      </Card>
      <div className="py-6 ">
        <Link to="/" className=" px-6 py-4 button-primary ">
          Trở về danh sách
        </Link>
      </div>
    </div>
  );
};

export default DetailTodos;
