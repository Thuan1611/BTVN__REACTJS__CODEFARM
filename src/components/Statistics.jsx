import {
  CheckOutlined,
  FieldTimeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useEffect, useState } from "react";
import api from "../axios/api";
import { handleCompleted } from "../ultils/handlePriority";
const Statistics = () => {
  const [task, setTask] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await api.get("products");
      setTask(data.data);
    };
    loadData();
  }, []);

  const taskDone = task?.filter(
    (item) => handleCompleted(item) === "Hoàn thành"
  ).length;
  const taskNoDone = task?.filter(
    (item) => handleCompleted(item) === "Chưa hoàn thành "
  ).length;


  return (
    <div className="flex gap-2 flex-between mb-8">
      <Card style={{ width: 300, flex: 1 }}>
        <div className="flex items-center gap-8">
          <UnorderedListOutlined
            style={{
              backgroundColor: "#e6f4ff",
              padding: 10,
              fontSize: 24,
              color: "#0958d9",
              borderRadius: 8,
            }}
          />
          <div>
            <p className="text-2xl text-gray-600">Tổng công việc</p>
            <p className="font-semibold">{task.length}</p>
          </div>
        </div>
      </Card>
      <Card style={{ width: 300, flex: 1, display: "flex" }}>
        <div className="flex items-center gap-8">
          <CheckOutlined
            style={{
              backgroundColor: "#f6ffed",
              padding: 10,
              fontSize: 24,
              color: "#389e0d",
              borderRadius: 8,
            }}
          />
          <div>
            <p className="text-2xl text-gray-600">Đã hoàn thành</p>
            <p className="font-semibold">{taskDone}</p>
          </div>
        </div>
      </Card>
      <Card style={{ width: 300, flex: 1, display: "flex" }}>
        <div className="flex  items-center gap-8">
          <FieldTimeOutlined
            style={{
              backgroundColor: "#fff7e6",
              padding: 10,
              fontSize: 24,
              color: "orange",
              borderRadius: 8,
            }}
          />
          <div>
            <p className="text-2xl text-gray-600">Đang thực hiện</p>
            <p className="font-semibold">{taskNoDone}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Statistics;
