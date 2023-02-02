import { useState, useEffect, ReactElement, useCallback } from "react";
import { renderToString } from "react-dom/server";
import { useSelector, useDispatch } from "react-redux";

import { RootState, changeDimensions, changePixelValue } from "./app/store";
import "./App.css";
import { PayloadAction } from "@reduxjs/toolkit";

function App() {
  const {
    dimensions: { height, width },
    pixelValues,
  } = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();

  const [cellColor, setCellColor] = useState<string>("#FFFFFF");
  const [heightInput, setHeightInput] = useState<number>(height);
  const [widthInput, setWidthInput] = useState<number>(width);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

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
          fill={pixelValues[y * width + x]}
          onClick={() => {
            changePixelValue({ x, y, value: cellColor });
          }}
          onMouseDown={() => {
            setMouseDown(true);
          }}
          onMouseMove={() => {
            mouseDown && dispatch(changePixelValue({ x, y, value: cellColor }));
          }}
          onMouseUp={() => {
            setMouseDown(false);
          }}
        />
      );
    }
  }

  //NOTE: saving to SVG requires generating the static XML for the SVG
  // console.log(renderToString(<>{cells}</>))

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
          dispatch(
            changeDimensions({ height: heightInput, width: widthInput })
          );
        }}
      >
        Custom size
      </button>

      <button
        onClick={() => {
          dispatch(changeDimensions({ height: 10, width: 10 }));
        }}
      >
        1X1
      </button>

      <button
        onClick={() => {
          dispatch(changeDimensions({ height: 20, width: 10 }));
        }}
      >
        1X2
      </button>

      <button
        onClick={() => {
          dispatch(changeDimensions({ height: 10, width: 20 }));
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
