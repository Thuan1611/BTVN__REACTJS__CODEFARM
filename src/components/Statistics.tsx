import { CheckOutlined, CloseCircleOutlined, FieldTimeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getStatistics } from '../store/features/todosSlice';
const Statistics = () => {
    const state = useAppSelector((state) => state.todos);
    const { statistics, todos } = state;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getStatistics());
    }, [todos.length]);

    return (
        <div className="flex gap-2 flex-between mb-8">
            <Card style={{ width: 300, flex: 1 }}>
                <div className="flex items-center gap-8">
                    <UnorderedListOutlined
                        style={{
                            backgroundColor: '#e6f4ff',
                            padding: 10,
                            fontSize: 24,
                            color: '#0958d9',
                            borderRadius: 8,
                        }}
                    />
                    <div>
                        <p className="text-2xl text-gray-600">Tổng công việc</p>
                        <p className="font-semibold">{statistics?.totalTodos}</p>
                    </div>
                </div>
            </Card>
            <Card style={{ width: 300, flex: 1, display: 'flex' }}>
                <div className="flex items-center gap-8">
                    <CheckOutlined
                        style={{
                            backgroundColor: '#f6ffed',
                            padding: 10,
                            fontSize: 24,
                            color: '#389e0d',
                            borderRadius: 8,
                        }}
                    />
                    <div>
                        <p className="text-2xl text-gray-600">Đã hoàn thành</p>
                        <p className="font-semibold">{statistics?.completedTodos}</p>
                    </div>
                </div>
            </Card>
            <Card style={{ width: 300, flex: 1, display: 'flex' }}>
                <div className="flex  items-center gap-8">
                    <FieldTimeOutlined
                        style={{
                            backgroundColor: '#fff7e6',
                            padding: 10,
                            fontSize: 24,
                            color: 'orange',
                            borderRadius: 8,
                        }}
                    />
                    <div>
                        <p className="text-2xl text-gray-600">Đang thực hiện</p>
                        <p className="font-semibold">{statistics?.noCompletedTodos}</p>
                    </div>
                </div>
            </Card>
            <Card style={{ width: 300, flex: 1, display: 'flex' }}>
                <div className="flex  items-center gap-8">
                    <CloseCircleOutlined
                        style={{
                            backgroundColor: '#FFE6D4',
                            padding: 10,
                            fontSize: 24,
                            color: 'red',
                            borderRadius: 8,
                        }}
                    />
                    <div>
                        <p className="text-2xl text-gray-600">Quá hạn</p>
                        <p className="font-semibold">{statistics?.overdue}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Statistics;
