import React, { useEffect, useState } from "react";
import { List, Card, Typography, Badge } from "antd";
import BedImage from "../images/Hospital Bed.png";
import Infusion from "../images/Infusion Pump.png";
import Oxygen from "../images/Oxygen Tank.png";
import Stretcher from "../images/Stretcher.png";
import Walker from "../images/Walker.png";
import WheelChairImage from "../images/Wheelchair.png";
import { collection, onSnapshot } from "firebase/firestore";
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
    const tasksCollection = collection(
      db,
      "Departments/Lb74r3alspSRv128sPl0/Tasks"
    );

    const unsubscribe = onSnapshot(
      tasksCollection,
      (taskSnapshot) => {
        let taskList = taskSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        taskList.sort((a, b) => {
          const priorityA = options.findIndex(option => option.label.toLowerCase() === a.priority.toLowerCase());
          const priorityB = options.findIndex(option => option.label.toLowerCase() === b.priority.toLowerCase());
          return priorityB - priorityA;
        });
  

        console.log("Fetched tasks: ", taskList);
        setTasks(taskList);
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);
  const options = [
    { value: "green", label: "low" },
    { value: "gold", label: "Medium" },
    { value: "orange", label: "High" },
    { value: "red", label: "Urgent" },
  ];
  const equipmentList = [
    { name: "Bed", image: BedImage },
    { name: "Stretcher", image: Stretcher },
    { name: "Walker", image: Walker },
    { name: "WheelChair", image: WheelChairImage },
    { name: "Oxygen Tank", image: Oxygen },
    { name: "Infusion Pump", image: Infusion },
  ];

  const equipmentMap = equipmentList.reduce((acc, equip) => {
    acc[equip.name] = equip.image;
    return acc;
  }, {});

  const getBadgeColor = (priorityLabel) => {
    const option = options.find(
      (option) => option.label.toLowerCase() === priorityLabel.toLowerCase()
    );
    return option ? option.value : "gray"; // Default color if no match is found
  };

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={tasks}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Badge.Ribbon
            text={item.priority}
            color={getBadgeColor(item.priority)}
          >
            <Card
              type="inner"
              title={
                <>
                <Typography>{item.assigner}</Typography>
                  
                </>
              }
              actions={Object.entries(item.equipment)
                .sort(([equipNameA], [equipNameB]) =>
                  equipNameA.localeCompare(equipNameB)
                ) // Sort alphabetically by equipment name
                .map(([equipmentName, quantity]) => {
                  const image = equipmentMap[equipmentName];
                  return (
                    <div style={{ alignItems: "center" }}>
                      {image && (
                        <img
                          src={image}
                          alt={equipmentName}
                          style={{ width: 32 }}
                        />
                      )}
                      <Typography>{`${equipmentName} : ${quantity}`}</Typography>
                    </div>
                  );
                })}
              style={{ width: "100%" }}
            >
              <Typography.Text type="secondary" style={{ marginTop: 10 }}>
                {formatTimestamp(item.create)}
              </Typography.Text>
              <Typography>{item.from} <ArrowRightOutlined /> {item.to}</Typography>
            </Card>
          </Badge.Ribbon>
        </List.Item>
      )}
    />
  );
}

export default PTasks;
