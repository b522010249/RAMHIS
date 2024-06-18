import React, { useEffect, useState } from "react";
import { List, Card, Typography } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { ArrowRightOutlined } from "@ant-design/icons";

const formatTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function PTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(
          db,
          "Departments/Lb74r3alspSRv128sPl0/Tasks"
        );
        const taskSnapshot = await getDocs(tasksCollection);
        const taskList = taskSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched tasks: ", taskList);
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={tasks}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card
            title={
              <>
                {item.from} <ArrowRightOutlined /> {item.to}
              </>
            }
            actions={Object.entries(item.equipment)
              .sort(([equipNameA], [equipNameB]) => equipNameA.localeCompare(equipNameB)) // Sort alphabetically by equipment name
              .map(([equipmentName, quantity]) => (
                <li key={equipmentName}>{`${equipmentName}: ${quantity}`}</li>
              ))
            }
            extra={
              <Typography.Text type="secondary">
                {formatTimestamp(item.create)}
              </Typography.Text>
            }
            style={{ width: "100%" }}
          >
            <Typography>Assigner: {item.assigner}</Typography>
          </Card>
          <Card title="Action" style={{ marginTop: 16 }}>
            <Typography>
              <ul></ul>
            </Typography>
          </Card>
        </List.Item>
      )}
    />
  );
}

export default PTasks;
