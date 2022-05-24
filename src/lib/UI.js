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
} from "antd";
import _ from "lodash";
import {
  CloseCircleOutlined,
  StarOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

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
  const { type } = props;
  const icon = getIcon(type);
  return icon;
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

  const field =
    type === "password" ? (
      <Input.Password
        {...rest}
        onChange={(e) => onChange({ value: e.currentTarget.value })}
      />
    ) : type === "textarea" ? (
      <TextArea {...rest} onChange={(e) => onChange(e, e.target.value)} />
    ) : (
      <Input
        {...rest}
        onChange={(e) => onChange({ value: e.currentTarget.value })}
      />
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

export {
  IconWrapper,
  ButtonWrapper,
  InputWrapper,
  CheckboxWrapper,
  MenuWrapper,
  CardWrapper,
  AlertWrapper,
  RadioWrapper,
};
