import { useState, useEffect, ReactElement } from "react";
import "./App.css";

type CanvasDimension = {
  height: number;
  width: number;
}

function App() {
  const updateCell = (x: number, y: number) => {
    const copy = cellData.slice();
    copy[y * width + x] = cellColor;
    setCellData(copy);
  };

  const generateCanvas = (
    height: number,
    width: number,
    color: string
  ): string[] => {
    const cellColors: string[] = new Array(height * width).fill(color);

    //generate red border

    // for (let y = 0; y < height; y++) {
    //   for (let x = 0; x < width; x++) {
    //     if (y === 0 || y === height - 1) {
    //       cellColors[y * width + x] = "red";
    //     }
    //   }
    //   cellColors[y * width] = "red";
    //   cellColors[y * width + width - 1] = "red";
    // }
    return cellColors;
  };

  const [cellColor, setCellColor] = useState<string>("#FFFFFF");
  const [canvasDimension, setCanvasDimension] = useState<CanvasDimension>({ height: 10, width: 10 });
  const { height, width } = canvasDimension;
  const [heightInput, setHeightInput] = useState<number>(height);
  const [widthInput, setWidthInput] = useState<number>(width);
  const [cellData, setCellData] = useState<string[]>(
    generateCanvas(height, width, cellColor)
  );
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  useEffect(() => {
    setCellData(generateCanvas(height, width, "#ffffff"));
    setHeightInput(height);
    setWidthInput(width);
  }, [canvasDimension]);

  const cellSize = 10;
  const viewWidth = cellSize * width;
  const viewHeight = cellSize * height;

  //cell generation
  const cells: ReactElement[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells.push(
        <rect
          key={y * width + x}
          width={cellSize}
          height={cellSize}
          x={x * cellSize}
          y={y * cellSize}
          stroke="grey"
          fill={cellData[y * width + x]}
          onClick={() => updateCell(x, y)}
          onMouseDown={()=> {
            setMouseDown(true)
          }}
          onMouseMove={() => {
            mouseDown && updateCell(x, y)
          }}
          onMouseUp={()=> {
            setMouseDown(false)
          }}
        />
      );
    }
  }

  return (
    <div>
      <input
        type="color"
        value={cellColor}
        onChange={(e) => setCellColor(e.target.value)}
      />
      <input
        type="number"
        value={heightInput}
        onChange={(e) => setHeightInput(parseInt(e.target.value))}
      />

      <input
        type="number"
        value={widthInput}
        onChange={(e) => setWidthInput(parseInt(e.target.value))}
      />

      <button
        onClick={() => {
          setCanvasDimension({ height: heightInput, width: widthInput });
          setCellData(generateCanvas(height, width, "#ffffff"));
        }}
      >
        Custom size
      </button>

      <button
        onClick={() => {
          setCanvasDimension({ height: 10, width: 10 });
          setCellData(generateCanvas(height, width, "#ffffff"));
        }}
      >
        1X1
      </button>

      <button
        onClick={() => {
          setCanvasDimension({ height: 10 * 2, width: 10 });
          setCellData(generateCanvas(height, width, "#ffffff"));
        }}
      >
        1X2
      </button>

      <button
        onClick={() => {
          setCanvasDimension({ height: 10, width: 10 * 2 });
          setCellData(generateCanvas(height, width, "#ffffff"));
        }}
      >
        2X1
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={viewWidth}
        height={viewHeight}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        version="1.1"
      >
        <g>{cells}</g>
      </svg>
    </div>
  );
}

export default App;
