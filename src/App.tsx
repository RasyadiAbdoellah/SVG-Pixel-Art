import { useState } from "react";
import { renderToString } from "react-dom/server";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  changeDimensions,
  changePixelValue,
  changeBaseColour,
} from "./app/canvas";
import { HexColorPicker } from 'react-colorful'
import "./App.css";

function App() {
  const {
    dimensions: { height, width },
    pixelValues,
  } = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();

  const [brushColour, setBrushColour] = useState<string>("#FFFFFF");
  const [baseColourInput, setBaseColourInput] = useState<string>("#FFFFFF");
  const [heightInput, setHeightInput] = useState<number>(height);
  const [widthInput, setWidthInput] = useState<number>(width);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const cellSize = 10;
  const viewWidth = cellSize * width;
  const viewHeight = cellSize * height;

  //NOTE: saving to SVG requires generating the static XML for the SVG
  // console.log(renderToString(<>{cells}</>))

  return (
    <div>
      <label>Brush Colour</label>
      <HexColorPicker color={brushColour} onChange={(colour) => setBrushColour(colour)}/>

      <label htmlFor="base-colour">Canvas Colour</label>
      <HexColorPicker color={baseColourInput} onChange={(colour) => setBaseColourInput(colour)}/>

      <input
        id="base-colour"
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
          dispatch(changeBaseColour(baseColourInput));
          dispatch(
            changeDimensions({ height: heightInput, width: widthInput })
          );
        }}
      >
        Generate Canvas
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
        <g>{pixelValues.map((value, i) => {
          const y = Math.floor(i/width)
          const x = i % width
          return (<rect
            key={i}
            width={cellSize}
            height={cellSize}
            x={x * cellSize}
            y={y * cellSize}
            stroke="grey"
            fill={value}
            onClick={() => {
              dispatch(changePixelValue({ x, y, value: brushColour }));
            }}
            onMouseDown={() => {
              setMouseDown(true);
            }}
            onMouseMove={() => {
              mouseDown &&
                dispatch(changePixelValue({ x, y, value: brushColour }));
            }}
            onMouseUp={() => {
              setMouseDown(false);
            }}
          />)
        })}</g>
      </svg>
    </div>
  );
}

export default App;
