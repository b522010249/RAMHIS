import React, { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  TimePicker,
  Button,
  Select,
  Space,
  Typography,
  Card,
  Badge,
} from "antd";
import moment from "moment";
import {
  doc,
  query,
  collection,
  where,updateDoc,deleteField,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const { Text } = Typography;

const RotaPlanning = () => {
  const [events, setEvents] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [form] = Form.useForm();
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const updateDates = (newDate) => {
    setSelectedDate(newDate);
  };

  const handlePrevYear = () => {
    updateDates(selectedDate.clone().subtract(1, "year"));
  };

  const handleNextYear = () => {
    updateDates(selectedDate.clone().add(1, "year"));
  };

  const handlePrevMonth = () => {
    updateDates(selectedDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    updateDates(selectedDate.clone().add(1, "month"));
  };

  const handleCellClick = (record, day) => {
    const employeeId = record.key;
    const dateString = moment({
      year: selectedDate.year(),
      month: selectedDate.month(),
      date: day,
    }).format("DD-MM-YYYY");
    const event = events[employeeId]?.[dateString];
    if (!event) {
      // Check if there's no event for the selected cell
      setSelectedDay(day);
      setSelectedEmployee(record);
      setIsModalVisible(true);
    } else {
      setSelectedEvent({id:employeeId,date:dateString,start:event.start,end:event.end});
      setIsModalVisible(true);
    }
  };


  const handleDeleteEvent = async () => {
    const { id, date } = selectedEvent;
    const employeeDocRef = doc(db, 'Employees', id);
        
    try {
        // Update the employee document to delete the specific date from the schedule
        await updateDoc(employeeDocRef, {
          [`schedule.${date}`]: deleteField()
      });
        console.log('Event removed successfully.');
    } catch (error) {
        console.error('Error removing event: ', error);
    }

    setSelectedEvent(null);
    setIsModalVisible(false);
};
  
  
  

  useEffect(() => {
    const departmentRef = doc(db, "Departments", "Lb74r3alspSRv128sPl0");
    const unsubscribe = onSnapshot(
      query(
        collection(db, "Employees"),
        where("department", "==", departmentRef)
      ),
      (querySnapshot) => {
        const updatedEvents = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const schedule = data.schedule || {};
          Object.keys(schedule).forEach((date) => {
            const employeeId = doc.id;
            const event = schedule[date];
            if (!updatedEvents[employeeId]) {
              updatedEvents[employeeId] = {};
            }
            updatedEvents[employeeId][date] = event;
          });
        });
        setEvents(updatedEvents);
        const employees = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          employees.push({
            key: doc.id,
            name: `${data.name.first} ${data.name.last}`,
          });
        });
        setEmployeeData(employees);
      }
    );

    return () => unsubscribe();
  }, [db]);

  const columns = [
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    ...Array.from({ length: selectedDate.daysInMonth() }, (_, i) => {
      const currentDate = selectedDate.clone().date(i + 1);
      const dateString = currentDate.format("DD-MM-YYYY");
      return {
        title: (
          <div
            style={{
              textAlign: "center",
              flexDirection: "column",
              display: "flex",
              backgroundColor: currentDate.isSame(moment(), "day")
                ? "#ffffb8"
                : "transparent",
              borderRadius: 10,
            }}
          >
            <Text>{i + 1}</Text>
            <Text type="secondary">{currentDate.format("ddd")}</Text>
          </div>
        ),
        dataIndex: (i + 1).toString(),
        key: (i + 1).toString(),
        width: 70,

        onCell: (record) => ({
          onClick: () => handleCellClick(record, i + 1),
        }),
        render: (_, record) => {
          const employeeId = record.key;
          const event = events[employeeId]?.[dateString];
          if (event) {
            let badgeColor = "";
            const startTime = parseInt(event.start.split(":")[0]); // Extract hour from start time
        
            // Set badge color based on start time range
            if (startTime >= 7 && startTime < 12) {
              badgeColor = "orange";
            } else if (startTime >= 13 && startTime < 15) {
              badgeColor = "red";
            } else if (startTime >= 16 || startTime === 23) {
              badgeColor = "cyan";
            } else if (startTime >= 0 || startTime === 5) {
              badgeColor = "black";
        }
            return (
              <Badge.Ribbon text={event.start} color={badgeColor}>
                <Card />
              </Badge.Ribbon>
            );
          } else {
            return null;
          }
        },
        
      };
    }),
    {
      title: "TotalHours",
      dataIndex: "totalHours",
      key: "totalHours",
      fixed: "right",
    },
  ];

  const data = employeeData.map((employee) => {
    const employeeEvents = { name: employee.name, key: employee.key };
    for (let i = 1; i <= selectedDate.daysInMonth(); i++) {
      const dateString = moment({
        year: selectedDate.year(),
        month: selectedDate.month(),
        date: i,
      }).format("DD-MM-YYYY");
      employeeEvents[i.toString()] = events[employee.name]?.[dateString] || "";
    }
    return employeeEvents;
  });

  const handleAddEvent = () => {
    form
      .validateFields()
      .then((values) => {
        const { time, title } = values;
        const startTime = time[0].format("HH:mm");
        const endTime = time[1].format("HH:mm");
        const selectedDateString = selectedDay
          ? moment().date(selectedDay).format("DD-MM-YYYY")
          : "";
        console.log(selectedDateString);
        const updatedEvents = { ...events };

        if (!updatedEvents[selectedEmployee.key]) {
          updatedEvents[selectedEmployee.key] = {};
        }

        updatedEvents[selectedEmployee.key][selectedDateString] = {
          start: startTime,
          end: endTime,
        };

        const employeeRef = doc(db, "Employees", selectedEmployee.key);
        setDoc(
          employeeRef,
          { schedule: updatedEvents[selectedEmployee.key] },
          { merge: true }
        );

        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <div><Typography.Title >Work Shift Planner</Typography.Title>
      <Space>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={handlePrevYear}>&lt;&lt;</Button>
          <span style={{ margin: "0 8px" }}>{selectedDate.year()}</span>
          <Button onClick={handleNextYear}>&gt;&gt;</Button>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={handlePrevMonth}>&lt;</Button>
          <span style={{ margin: "0 8px" }}>{selectedDate.format("MMMM")}</span>
          <Button onClick={handleNextMonth}>&gt;</Button>
        </div>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: "max-content" }}
        bordered
        size="small"
        rowKey="name"
      />
      <Modal
        title={`${
          selectedDay ? moment().date(selectedDay).format("DD/MM/YYYY") : ""
        }`}
        visible={isModalVisible}
        onCancel={() => {
          setSelectedEvent(null);
          setIsModalVisible(false);
        }}
        footer={null}
      >
        <div style={{textAlign:'center'}}>
        {selectedEvent ? (
          <Space direction="vertical">
            <Text>Start Time: {selectedEvent.start}</Text>
            <Text>End Time: {selectedEvent.end}</Text>
            <Button type="primary" danger onClick={handleDeleteEvent}>
              Delete Event
            </Button>
          </Space>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item label="Employee">
              <Input value={selectedEmployee?.name} disabled />
            </Form.Item>
            <Form.Item label="Time" name="time">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={handleAddEvent}>
                Add Event
              </Button>
            </Form.Item>
          </Form>
        )}
        </div>
      </Modal>
    </div>
  );
};

export default RotaPlanning;
