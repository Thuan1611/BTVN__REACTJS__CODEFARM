import React, { useEffect, useState } from "react";
import { fetchData } from "../axios/ListProducts";
import { handleCompleted, handlePriority } from "../ultils/handlePriority";
import { Input, Pagination, Select, Space, Table } from "antd";
import PagiNation from "../components/PagiNation";

const ImportantTodos = () => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState(null);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 10,
    priority: 3,
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData(query);
      setProducts(data);
    };
    loadData();
  }, [query]);

  const productsDetail = products?.data?.filter((item) => item.priority === 3);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "completed",
      render: (_, record) => handleCompleted(record),
      key: "completed",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Priority",
      render: (_, record) => handlePriority(record.priority),
      key: "priority",
    },
    {
      title: "DueDate",
      render: (_, record) => record.dueDate.slice(0, 10),
      key: "dueDate",
    },
  ];
  console.log(new Date().toLocaleString())
  return (
    <div>
      <Space wrap style={{ marginBottom: 20 }}>
        <Input.Search
          placeholder="Vui lòng nhập..."
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onSearch={() => setQuery({ ...query, q: searchValue })}
          enterButton
          style={{ width: 300 }}
        />
      </Space>
      <Table
        rowKey={(record) => record._id}
        dataSource={productsDetail}
        columns={columns}
        // pagination={{ current: query._page ,pageSize: query._limit}}
      />
    </div>
  );
};

export default ImportantTodos;
