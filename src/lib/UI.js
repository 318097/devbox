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
  Tag,
} from "antd";
import _ from "lodash";
import {
  CloseOutlined,
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
      return <CloseOutlined />;
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
  const { options = [], onChange } = props;

  const handleChange = (item) => {
    onChange(item.key);
  };

  const items = _.map(options, ({ value, label }) => ({
    label,
    key: value, // key prop is required
  }));

  const menu = <Menu items={items} onClick={handleChange} />;

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <IconWrapper type="more" />
    </Dropdown>
  );
};

const EmptyWrapper = () => {
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

const TagWrapper = ({ children, ...rest }) => {
  return <Tag {...rest}>{children}</Tag>;
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
  TagWrapper,
};
