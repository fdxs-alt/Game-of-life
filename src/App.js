import React, { useState, useCallback, useRef } from "react";
import { produce } from "immer";
import { generateGrid, operations, R, C } from "./utils";
import "./App.css";

const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateGrid();
  });
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const run = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((prev) =>
      produce(prev, (gridCopy) => {
        for (let i = 0; i < R; i++) {
          for (let j = 0; j < C; j++) {
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < R && newJ >= 0 && newJ < C) {
                neighbours += prev[newI][newJ];
              }
            });
            if (neighbours < 2 || neighbours > 3) {
              gridCopy[i][j] = 0;
            } else if (prev[i][j] === 0 && neighbours === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      })
    );
    setTimeout(run, 500);
  }, []);

  return (
    <div className="container">
      <button
        style={{ marginRight: 50 }}
        onClick={() => {
          setRunning((prev) => !prev);
          if (!running) {
            runningRef.current = true;
            run();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={() => setGrid(generateGrid())}>Reset</button>
      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: `repeat(${C}, 20px)`,
          gridTemplateRows: `repeat(${R}, 20px)`,
          gap: 2,
        }}
      >
        {grid.map((c, i) =>
          c.map((r, k) => (
            <div
              style={{
                backgroundColor: grid[i][k] ? "blue" : undefined,
                width: "20px",
                height: "20px",
                border: "1px solid black",
              }}
              key={toString(Math.random())}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
