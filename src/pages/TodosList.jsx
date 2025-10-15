import React, { useEffect, useState } from "react";
import { fetchData } from "../axios/ListProducts";
import { Space, Table, Input, Button, ConfigProvider, Select } from "antd";
import { handleCompleted, handlePriority } from "../ultils/handlePriority";
import { Link } from "react-router-dom";
import PagiNation from "../components/PagiNation";
const { Search } = Input;
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
  // console.log(products)
  const columns = [
    {
      title: "Index",
      render: (_, __, index) => index + 1,
      key: "Index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Completed",
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
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="primary">Sửa</Button>
          <Button type="primary" danger>
            Xóa
          </Button>
          <Button type="primary" variant="filled" color="pink">
            <Link to={`${record._id}`}>Chi tiet</Link>
          </Button>
        </Space>
      ),
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
            const [sort, order, _gte] = e.split(" ");
            setQuery({
              ...query,
              _sort: sort,
              _order: order,
              priority_gte: _gte || null,
            });
          }}
          options={[
            { value: "id desc", label: "Mặc định" },
            { value: "id desc 3", label: "Khẩn cấp" },
            { value: "priority desc ", label: "Priority(Giảm dần)" },
            { value: "priority asc", label: "Priority(Tăng dần)" },
          ]}
        />
        <select
          name=""
          id=""
          onChange={(e) => {
            const dataToday = new Date();
            dataToday.setDate(dataToday.getDate() + 1);
            const valueDate = dataToday.toISOString().slice(0, 10);
            const [task, done] = e.target.value.split(" ");
            if (task === "quaHan") {
              setQuery({
                ...query,
                completed: done,
                dueDate_lte: valueDate,
                dueDate_gte: false,
              });
            }
            if (task === "noDone") {
              setQuery({
                ...query,
                completed: done,
                dueDate_gte: valueDate,
                dueDate_lte: false,
              });
            }
            if (task === "done") {
              setQuery({
                ...query,
                completed: done,
                dueDate_gte: false,
                dueDate_lte: false,
              });
            }
          }}
        >
          <option value="quaHan false">Quá hạn</option>
          <option value="done true">Hoàn thành</option>
          <option value="noDone false">Chưa hoàn thành</option>
        </select>
      </Space>
      <Table
        rowKey={(record) => record._id}
        dataSource={products}
        columns={columns}
      ></Table>
      <PagiNation meta={meta} query={query} setQuery={setQuery} />
    </div>
  );
};

export default TodosList;
