export const R = 30;
export const C = 30;

export const generateGrid = () => {
  const rows = [];
  for (let i = 0; i < R; i++) {
    rows.push(Array.from(Array(C), () => (Math.random() > 0.8 ? 1 : 0)));
  }
  return rows;
};

export const operations = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
