import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  theme,
} from "antd";
import React from "react";
const options = [
  { value: "green", label: "low" },
  {
    value: "yellow",
    label: "Medium",
  },  {
    value: "orange",
    label: "High",
  },
  {
    value: "red",
    label: "Urgent",
  },
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
      style={{
        marginInlineEnd: 4,
      }}
    >
      {label}
    </Tag>
  );
};
function Requestporter() {
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <>
      <Typography.Title level={4}>Information :</Typography.Title>
      <Row gutter={[16, 24]}>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Typography>From</Typography>
          <Select
            placeholder={"from"}
            style={{
              width: "100%",
            }}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Typography>To</Typography>
          <Select
            placeholder={"to"}
            style={{
              width: "100%",
            }}
          />
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
            defaultValue={{label:"Normal",value:"yellow"}}
            options={options}
          />
        </Col>
      </Row>

      <Divider />
      <Typography.Title level={4}>Equipment Required :</Typography.Title>
      <Row gutter={[16, 24]}>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Card bordered={false}>
            <InputNumber
              min={0}
              max={5}
              defaultValue={0}
              onChange={onChange}
              changeOnWheel
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Card bordered={false}>
            <InputNumber
              min={0}
              max={5}
              defaultValue={0}
              onChange={onChange}
              changeOnWheel
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Card bordered={false}>
            <InputNumber
              min={0}
              max={5}
              defaultValue={0}
              onChange={onChange}
              changeOnWheel
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Card bordered={false}>
            <InputNumber
              min={0}
              max={5}
              defaultValue={0}
              onChange={onChange}
              changeOnWheel
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Card bordered={false}>
            <InputNumber
              min={0}
              max={5}
              defaultValue={0}
              onChange={onChange}
              changeOnWheel
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
          <Card bordered={false}>
            <InputNumber
              min={0}
              max={5}
              defaultValue={0}
              onChange={onChange}
              changeOnWheel
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Requestporter;
