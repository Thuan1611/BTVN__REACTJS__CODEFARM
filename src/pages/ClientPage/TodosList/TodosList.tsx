import React, { useEffect, useState } from 'react';
import { deleteData, fetchData } from '../../../axios/ListProducts';
import { Space, Table, Input, Button, Select, Checkbox, Typography } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import PagiNation from '../../../components/PagiNation';
import { ITodos } from '../../../types/ITodos';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getAllTodos, getPagiNation, removeTodos } from '../../../store/features/todosSlice';
import { handleCompleted, handlePriority } from '../../../ultils/handlePriority';
const { Search } = Input;
const { Text } = Typography;
const TodosList = () => {
    const nav = useNavigate();
    const { todos, meta } = useAppSelector((state) => state.todos);

    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [query, setQuery] = useState({
        _page: 1,
        _limit: 10,
    });
    const loadData = async () => {
        const response = await fetchData();
        dispatch(getAllTodos(response.data));
        dispatch(getPagiNation(response.meta));
    };
    useEffect(() => {
        loadData();
    }, [query]);
    const columns = [
        {
            title: 'Index',
            render: (_: any, record: ITodos) => (
                <Checkbox
                    onChange={(e) => {
                        const checked = handleCompleted(record) === 'Hoàn thành';
                        e.target.checked === checked ? <Text delete>Ant Design (delete)</Text> : console.log("hihi");
                    }}
                />
            ),
            key: 'Index',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Completed',
            render: (_: any, record: ITodos) => handleCompleted(record),
            key: 'completed',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Priority',
            render: (_: any, record: ITodos) => handlePriority(record.priority),
            key: 'priority',
        },
        {
            title: 'DueDate',
            render: (_: any, record: ITodos) => String(record.dueDate)?.slice(0, 10),
            key: 'dueDate',
        },
        {
            title: 'Actions',
            render: (_: any, record: ITodos) => (
                <Space>
                    <Button type="primary">
                        <Link to={`/form/${record._id}`}>Sửa</Link>
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            deleteData(record._id);
                            dispatch(removeTodos(record));
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
    //Đăng xuất
    const logOut = () => {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        if (token) {
            localStorage.clear();
            sessionStorage.clear();
        }
        nav('/login');
    };
    // handleGetHours()
    //Lọc trạng thái
    const handleCompletedTask = (e: string) => {
        const dataToday = new Date();
        dataToday.setDate(dataToday.getDate() + 1);
        const valueDate = dataToday.toISOString().slice(0, 10);
        const [task, done] = e.split(' ');
        const taskDone: any = {
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Space>
                    <Search
                        placeholder="Vui lòng nhập..."
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        // onSearch={() => setQuery({ ...query, q: searchValue })}
                        enterButton
                        style={{ width: 300 }}
                    />
                    <Select
                        defaultValue="id desc"
                        style={{ width: 120 }}
                        onChange={(e) => {
                            const [sort, order, priority] = e.split(' ');
                            // setQuery({
                            //   ...query,
                            //   _sort: sort,
                            //   _order: order,
                            //   priority: priority || null,
                            // });
                        }}
                        options={[
                            { value: 'id desc', label: 'Mặc định' },
                            { value: 'id desc 3', label: 'Khẩn cấp' },
                            { value: 'priority desc ', label: 'Priority(Giảm dần)' },
                            { value: 'priority asc', label: 'Priority(Tăng dần)' },
                        ]}
                    />

                    <Select
                        onChange={(e) => handleCompletedTask(e)}
                        defaultValue="Hoàn Thành"
                        options={[
                            { value: 'quaHan false', label: 'Quá hạn' },
                            { value: 'done true', label: 'Hoàn thành' },
                            { value: 'noDone false ', label: 'Chưa hoàn thành' },
                        ]}
                    ></Select>
                    <Button onClick={() => setQuery({ _page: 1, _limit: 10 })}>Reset</Button>
                </Space>
                <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => logOut()}>
                    Đăng xuất
                </Button>
                <Button
                    type="text"
                    className={` !bg-gradient-to-r !from-pink-500 !to-purple-600 !text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 `}
                >
                    <Link to={'/form'}>Thêm công việc</Link>
                </Button>
            </Space>

            <Table rowKey={(record) => record._id} dataSource={todos} columns={columns}></Table>
            <PagiNation meta={meta} query={query} setQuery={setQuery} />
        </div>
    );
};

export default TodosList;
