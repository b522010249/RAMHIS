import {
  Card,
  Col,
  Divider,
  InputNumber,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Image,
  Button,
} from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import BedImage from "../images/Hospital Bed.png";
import Infusion from "../images/Infusion Pump.png";
import Oxygen from "../images/Oxygen Tank.png";
import Stretcher from "../images/Stretcher.png";
import Walker from "../images/Walker.png";
import WheelChairImage from "../images/Wheelchair.png";
import TextArea from "antd/es/input/TextArea";
import { db } from "../config/firebase";
import { collection, getDocs,serverTimestamp ,addDoc } from "firebase/firestore";
import { Option } from "antd/es/mentions";

const options = [
  { value: "green", label: "low" },
  { value: "yellow", label: "Medium" },
  { value: "orange", label: "High" },
  { value: "red", label: "Urgent" },
];

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

function Requestporter({ onCancel }) {
  const [task, setTask] = useState({
    from: "",
    to: "",
    priority: "", // Changed to string
    equipment: [],
    details: "",

  });

  const [equipmentQuantities, setEquipmentQuantities] = useState({});
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const querySnapshot = await getDocs(collection(db, "Departments"));
      const departmentList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setDepartments(departmentList);
    };

    fetchDepartments();
  }, []);

  const handleQuantityChange = (name, value) => {
    setEquipmentQuantities((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const incrementQuantity = (name) => {
    setEquipmentQuantities((prevState) => ({
      ...prevState,
      [name]: (prevState[name] || 0) + 1,
    }));
  };

  const decrementQuantity = (name) => {
    setEquipmentQuantities((prevState) => ({
      ...prevState,
      [name]: Math.max((prevState[name] || 0) - 1, 0),
    }));
  };

  const handlePriorityChange = (value) => {
    const selectedPriorities = options.filter((option) => value.includes(option.value));
    if (selectedPriorities.length > 0) {
      setTask((prevTask) => ({
        ...prevTask,
        priority: selectedPriorities.map((priority) => priority.label).join(", "), // Store selected labels as comma-separated string
      }));
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        priority: "", // Clear priority if nothing selected
      }));
    }
  };

  const handleFromChange = (value) => {
    setTask((prevTask) => ({
      ...prevTask,
      from: value,
    }));
  };

  const handleToChange = (value) => {
    setTask((prevTask) => ({
      ...prevTask,
      to: value,
    }));
  };

  const handleSubmit = async () => {
    // Filter equipment to include only those with non-zero quantities
    const equipmentDetails = Object.keys(equipmentQuantities).reduce(
      (acc, name) => {
        const quantity = equipmentQuantities[name];
        if (quantity > 0) {
          acc.push({
            [name]: quantity,
          });
        }
        return acc;
      },
      []
    );

    // Prepare the task object to submit
    const taskToSubmit = {
      from: task.from,
      to: task.to,
      priority: task.priority, // priority is now a single string
      equipment: equipmentDetails.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      ), // Flatten the equipment array to a single object
      details: task.details,
      assigner: JSON.parse(sessionStorage.getItem("user")).department,
      create: serverTimestamp(),
      status:false
    };

    // Here you can submit 'taskToSubmit' to your backend or perform any further actions
    console.log("Submitting task:", taskToSubmit);
    try {

      await addDoc(collection(db, "Departments", "Lb74r3alspSRv128sPl0", "Tasks"), taskToSubmit);
      console.log("Task successfully submitted:", taskToSubmit);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
    
  };
  const handleCancel = () => {
    // Call onCancel function passed from props
    if (typeof onCancel === "function") {
      onCancel();
    }
  };
  const equipmentList = [
    { name: "Bed", image: BedImage },
    { name: "Stretcher", image: Stretcher },
    { name: "Walker", image: Walker },
    { name: "WheelChair", image: WheelChairImage },
    { name: "Oxygen Tank", image: Oxygen },
    { name: "Infusion Pump", image: Infusion },
  ];

  return (
    <>
      <Typography.Title level={4}>Information:</Typography.Title>
      <Row gutter={[16, 24]}>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Typography>From</Typography>
          <Select
            placeholder={"Select department"}
            style={{ width: "100%" }}
            onChange={handleFromChange}
          >
            {departments.map((department) => (
              <Option key={department.id} value={department.name}>
                {department.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Typography>To</Typography>
          <Select
            placeholder={"Select department"}
            style={{ width: "100%" }}
            onChange={handleToChange}
          >
            {departments.map((department) => (
              <Option key={department.id} value={department.name}>
                {department.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
          <Typography>Priority</Typography>
          <Select
            mode="multiple"
            maxCount={1}
            placeholder={"Priority"}
            style={{
              width: "100%",
            }}
            tagRender={tagRender}
            options={options}
            onChange={handlePriorityChange}
          />
        </Col>
      </Row>
      <Divider />
      <Typography.Title level={4}>Equipment Required:</Typography.Title>
      <Row gutter={[16, 24]}>
        {equipmentList.map((equipment) => (
          <Col key={equipment.name} xs={24} sm={12} md={12} lg={12} xl={8}>
            <Card bordered={false}>
              <Space
                align="center"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Space
                  align="center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputNumber
                    min={0}
                    max={5}
                    value={equipmentQuantities[equipment.name] || 0}
                    onChange={(value) =>
                      handleQuantityChange(equipment.name, value)
                    }
                    style={{ marginRight: 8 }}
                  />
                  <Image width={64} src={equipment.image} preview={false} />
                  <Typography.Text strong>{equipment.name}</Typography.Text>
                </Space>
                <Space align="center">
                  {equipmentQuantities[equipment.name] > 0 && (
                    <MinusCircleOutlined
                      style={{ fontSize: 32 }}
                      onClick={() => decrementQuantity(equipment.name)}
                    />
                  )}
                  <PlusCircleOutlined
                    style={{ fontSize: 32 }}
                    onClick={() => incrementQuantity(equipment.name)}
                  />
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider />
      <Space direction="vertical" style={{ display: "flex" }}>
        <Typography.Title level={4}>Details:</Typography.Title>
        <TextArea
          rows={4}
          value={task.details}
          onChange={(e) =>
            setTask((prevTask) => ({
              ...prevTask,
              details: e.target.value,
            }))
          }
        />

        <div style={{ textAlign: "right", paddingTop: 10 }}>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={handleCancel}>Cancel</Button>
        </div>
      </Space>
    </>
  );
}

export default Requestporter;
