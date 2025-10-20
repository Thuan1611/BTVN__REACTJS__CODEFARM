import React, { useEffect, useState } from "react";
import { deleteData, fetchData } from "../../axios/ListProducts";
import { Space, Table, Input, Button, ConfigProvider, Select } from "antd";
import { handleCompleted, handlePriority } from "../../ultils/handlePriority";
import { Link } from "react-router-dom";
import PagiNation from "../../components/PagiNation";
const { Search } = Input;
const TodosList = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 10,
  });
  const loadData = async () => {
    const respone = await fetchData(query);
    setProducts(respone?.data);
    setMeta(respone?.meta);
  };
  useEffect(() => {
    loadData();
  }, [query]);

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
      render: (_, record) => record.dueDate?.slice(0, 10),
      key: "dueDate",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="primary">
            <Link to={`/form/${record._id}`}>Sửa</Link>
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              if (confirm("Are you sure")) {
                deleteData(record._id);
              }
              loadData();
            }}
          >
            Xóa
          </Button>
          <Button type="primary" variant="filled" color="pink">
            <Link to={`${record._id}`}>Chi tiet</Link>
          </Button>
        </Space>
      ),
    },
  ];

  //Lọc trạng thái
  const handleCompletedTask = (e) => {
    const dataToday = new Date();
    dataToday.setDate(dataToday.getDate() + 1);
    const valueDate = dataToday.toISOString().slice(0, 10);
    const [task, done] = e.split(" ");
    const taskDone = {
      quaHan: { completed: done, dueDate_lte: valueDate, dueDate_gte: false },
      done: { completed: done, dueDate_lte: false, dueDate_gte: false },
      noDone: { completed: done, dueDate_lte: false, dueDate_gte: valueDate },
    };
    setQuery({ ...query, ...taskDone[task] });
  };

  return (
    <div>
      <Space
        wrap
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Space>
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
              const [sort, order, priority] = e.split(" ");
              setQuery({
                ...query,
                _sort: sort,
                _order: order,
                priority: priority || null,
              });
            }}
            options={[
              { value: "id desc", label: "Mặc định" },
              { value: "id desc 3", label: "Khẩn cấp" },
              { value: "priority desc ", label: "Priority(Giảm dần)" },
              { value: "priority asc", label: "Priority(Tăng dần)" },
            ]}
          />

          <Select
            onChange={(e) => handleCompletedTask(e)}
            defaultValue="Hoàn Thành"
            options={[
              { value: "quaHan false", label: "Quá hạn" },
              { value: "done true", label: "Hoàn thành" },
              { value: "noDone false ", label: "Chưa hoàn thành" },
            ]}
          ></Select>
          <Button onClick={() => setQuery({ _page: 1, _limit: 10 })}>
            Reset
          </Button>
        </Space>
        <Button style={{ backgroundColor: "green", color: "white" }}>
          <Link to="/form">Thêm công việc</Link>
        </Button>
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
