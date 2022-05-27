/* Ant design wrapper */

import React from "react";
import {
  Card,
  Button,
  Input,
  Checkbox,
  Menu,
  Dropdown,
  Alert,
  Radio,
  Empty,
} from "antd";
import _ from "lodash";
import {
  CloseCircleOutlined,
  StarOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const iconDefault = {
  cursor: "pointer",
  background: "whitesmoke",
  display: "inline-flex",
  width: "20px",
  height: "20px",
  borderRadius: "4px",
  alignItems: "center",
  justifyContent: "center",
};

const getIcon = (type) => {
  switch (type) {
    case "close":
      return <CloseCircleOutlined />;
    case "star":
      return <StarOutlined />;
    case "plus":
      return <PlusOutlined />;
    case "more":
      return <MoreOutlined />;
  }
};

const IconWrapper = (props) => {
  const { type, ...rest } = props;
  const icon = getIcon(type);
  return (
    <span {...rest} style={iconDefault}>
      {icon}
    </span>
  );
};

const ButtonWrapper = (props) => {
  const { children } = props;
  return <Button {...props}>{children}</Button>;
};

const RadioWrapper = (props) => {
  const { options, value, onChange } = props;
  return (
    <Radio.Group
      {...props}
      optionType="button"
      options={options}
      onChange={(e) => onChange(e, e.target.value)}
      value={value}
    />
  );
};

const InputWrapper = (props) => {
  const { type, onChange, required, error, label, ...rest } = props;

  const handleOnChange = (e) => {
    const key = props.name;
    const value = e.currentTarget.value;
    onChange(e, value, { [key]: value });
  };

  const field =
    type === "password" ? (
      <Input.Password
        {...rest}
        onChange={(e) => onChange({ value: e.currentTarget.value })}
      />
    ) : type === "textarea" ? (
      <TextArea {...rest} onChange={(e) => onChange(e, e.target.value)} />
    ) : (
      <Input {...rest} onChange={handleOnChange} />
    );

  return field;
};

const CheckboxWrapper = (props) => {
  return <Checkbox {...props} />;
};

const CardWrapper = (props) => {
  return <Card {...props} />;
};

const AlertWrapper = (props) => {
  return <Alert {...props} />;
};

const MenuWrapper = (props) => {
  const { menu = [], onChange } = props;
  const overlay = (
    <Menu>
      {_.map(menu, ({ id, label, icon }) => (
        <Menu.Item key={id}>{label}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={overlay} trigger={["click"]}>
      <IconWrapper type="more" />
    </Dropdown>
  );
};

const EmptyWrapper = () => {
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

export {
  IconWrapper,
  ButtonWrapper,
  InputWrapper,
  CheckboxWrapper,
  MenuWrapper,
  CardWrapper,
  AlertWrapper,
  RadioWrapper,
  EmptyWrapper,
};
