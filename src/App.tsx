import { useState, useLayoutEffect, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { cloneDeep, isMatch } from "lodash";
import "./App.css";

function generateCells(
  height: number,
  width: number,
  color: string
): string[][] {
  const cellData: string[][] = [];
  for (let i = 0; i < width; i++) {
    if (i === 0 || i === width - 1) {
      cellData.push(new Array(height).fill("red"));
    } else {
      cellData.push(new Array(height).fill(color));
      cellData[i][0] = "red";
      cellData[i][height - 1] = "red";
    }
  }
  return cellData;
}

function App() {
  const [cellColor, setCellColor] = useState<string>("#FFFFFF");
  const [height, setHeight] = useState<number>(26);
  const [width, setWidth] = useState<number>(26);

  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const cellSize = 10;

  const viewWidth = cellSize * width;
  const viewHeight = cellSize * height;

  const [cellData, setCellData] = useState<string[][]>(
    generateCells(height, width, cellColor)
  );

  const updateCell = (x: number, y: number) => {
    const copy = cloneDeep(cellData);
    copy[x][y] = cellColor;
    setCellData(copy);
  };

  useEffect(() => {
    console.log("useeffect");
    setCellData(generateCells(height, width, "#ffffff"));
  }, [height, width]);

  return (
    <div>
      <input
        type="text"
        value={cellColor}
        onChange={(e) => setCellColor(e.target.value)}
      />
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(parseInt(e.target.value))}
      />

      <input
        type="number"
        value={width}
        onChange={(e) => setWidth(parseInt(e.target.value))}
      />

      <button
        onClick={() => {
          setWidth(26);
          setHeight(26);
          setCellData(generateCells(height, width, "#ffffff"));
        }}
      >
        1X1
      </button>

      <button
        onClick={() => {
          setWidth(26);
          setHeight(54);
          setCellData(generateCells(height, width, "#ffffff"));
        }}
      >
        1X2
      </button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={viewWidth}
        height={viewHeight}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        version="1.1"
      >
        <g>
          {cellData.map((rows, x) => {
            return rows.map((value, y) => {
              const xPos = x * cellSize;
              const yPos = y * cellSize;
              return (
                <rect
                  key={`${x}_${y}`}
                  width={cellSize}
                  height={cellSize}
                  x={xPos}
                  y={yPos}
                  stroke="black"
                  fill={value}
                  onClick={() => {
                    if (value !== "red") {
                      updateCell(x, y);
                    }
                  }}
                  onMouseDown={() => {
                    setMouseDown(true);
                  }}
                  onMouseMove={() => {
                    if (mouseDown && value !== "red") {
                      updateCell(x, y);
                    }
                  }}
                  onMouseUp={() => {
                    setMouseDown(false);
                  }}
                />
              );
            });
          })}
        </g>
      </svg>
    </div>
  );
}

export default App;
