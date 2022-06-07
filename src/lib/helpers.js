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

export { getRandomColor };
