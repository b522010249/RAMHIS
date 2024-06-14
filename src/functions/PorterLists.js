import React from 'react';
import { Avatar, List, Steps } from 'antd';
const data = [
  {
    title: 'Ant Design Title 1',
    current: 0,
  },
  {
    title: 'Ant Design Title 2',
    current: 1,
  },
  {
    title: 'Ant Design Title 3',
    current: 2,
  },
  {
    title: 'Ant Design Title 4',
    current: 1,
  },
];

const items = [
    {
      title: 'Pending',
      description: 'Waiting Porter',

    },
    {
      title: 'Service',
      description: 'Porter Servicing',
    },
    {
      title: 'Complete',
      description: 'Porter Finish Tasks',
    },
  ];
const PorterLists = () => (
  <div>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
          <Steps
            style={{
              marginTop: 8,
            }}
            type="inline"
            current={item.current}
            status={item.status}
            items={items}
          />
        </List.Item>
      )}
    />
  </div>
);
export default PorterLists;