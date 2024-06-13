import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase'; // Adjust path as per your project setup
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

function Employee() {
  const [employeeData, setEmployeeData] = useState([]);
  const departmentRef = doc(db, 'Departments', 'Lb74r3alspSRv128sPl0');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'Employees'), where('department', '==', departmentRef)), (querySnapshot) => {
      const employees = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        employees.push({
          key: doc.id,
          name: `${data.name.first} ${data.name.last}`,
          status: data.status,
        });
      });
      setEmployeeData(employees);
    });

    return () => unsubscribe();
  }, [departmentRef]);

  return <Table columns={columns} dataSource={employeeData} />;
}

export default Employee;
