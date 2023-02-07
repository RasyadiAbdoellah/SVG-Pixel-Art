import { useState } from "react";
import { renderToString } from "react-dom/server";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  changeDimensions,
  changeBaseColour,
} from "./app/canvas";
import { changeToolColour } from "./app/activeTool";
import { HexColorPicker } from "react-colorful";
import "./App.css";
import PixelGrid from "./components/PixelGrid";

function App() {

  // For now, App handles manages the active tool colour/type and the canvas height/width
  // These will probably be abstracted out to their own components so that App is solely for placing the individual pieces on a page
  const {
    canvas: {
      dimensions: { height, width },
    },
    activeTool: { toolColour },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [baseColourInput, setBaseColourInput] = useState<string>("#FFFFFF");
  const [heightInput, setHeightInput] = useState<number>(height);
  const [widthInput, setWidthInput] = useState<number>(width);

  //NOTE: saving to SVG requires generating the static XML for the SVG
  // console.log(renderToString(<>{cells}</>))

  return (
    <div>
      <label>Brush Colour</label>
      <HexColorPicker
        color={toolColour}
        onChange={(colour) => dispatch(changeToolColour(colour))}
      />

      <label htmlFor="base-colour">Canvas Colour</label>
      <HexColorPicker
        color={baseColourInput}
        onChange={(colour) => setBaseColourInput(colour)}
      />

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
      <PixelGrid />
    </div>
  );
}

export default App;
