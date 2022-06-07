import shortid from "shortid";

const getRandomElement = (size) => {
  const randomElement = Math.floor(Math.random() * 100) % size;
  return randomElement;
};

const getRandomColor = () => {
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  const position = getRandomElement(colors.length);
  return colors[position];
};

const generateId = () => shortid.generate();

const generateTime = () => new Date().toISOString();

const menuOptions = [
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete" },
];

const parseJSON = ({ keyValue }) => {
  try {
    const value = JSON.parse(keyValue);
    return { value, type: "JSON" };
  } catch (e) {
    return { value: keyValue, type: "STRING" };
  }
};

const parseValue = ({ keyName, path }) => {
  const keyValue = localStorage.getItem(keyName);

  if (!keyValue) return "UNDEFINED_KEY";

  const { value, type } = parseJSON({ keyValue });
  const processedValue = type === "JSON" ? _.get(value, path) : value;

  return String(processedValue) ?? "UNDEFINED_VALUE";
};

export {
  getRandomColor,
  generateId,
  generateTime,
  menuOptions,
  parseJSON,
  parseValue,
};
