import React, { useEffect, useState } from "react";
import { fetchData } from "../axios/ListProducts";
import { handleCompleted, handlePriority } from "../ultils/handlePriority";
import { Pagination, Select, Space, Table } from "antd";
import PagiNation from "../components/PagiNation";
import Search from "antd/es/transfer/search";

const ImportantTodos = () => {
  const [searchValue,setSearchValue] = useState("")
  const [products, setProducts] = useState(null);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 10,
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

  return (
    <div>
      <Space wrap style={{ marginBottom: 20 }}>
        <Search
          placeholder="Vui lòng nhập..."
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onSearch={() => setQuery({ ...query, q: searchValue })}
          enterButton
          style={{ width: 300 }}
        />
        <Select
          defaultValue="id desc"
          style={{ width: 120 }}
          onChange={(e) => {
            const [sort, order] = e.split(" ");
            setQuery({ ...query, _sort: sort, _order: order });
          }}
          options={[
            { value: "id desc", label: "Mặc định" },
            { value: "priority desc", label: "Priority(Giảm dần)" },
            { value: "priority asc", label: "Priority(Tăng dần)" },
          ]}
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
