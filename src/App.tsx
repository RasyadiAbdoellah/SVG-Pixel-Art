import { useState } from "react";
import { renderToString } from "react-dom/server";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { changeDimensions } from "./app/canvas";
import { changeToolColour, changeToolType } from "./app/activeTool";
import { HexColorPicker } from "react-colorful";
import PixelGrid, { ExportGrid } from "./components/PixelGrid";

function App() {
  // App manages the active tool colour/type and the canvas height/width
  // These will probably be abstracted out to their own components so that App is purely presentational
  const {
    canvas,
    activeTool: { toolColour, toolType },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [heightInput, setHeightInput] = useState<number>(
    canvas.dimensions.height
  );
  const [widthInput, setWidthInput] = useState<number>(canvas.dimensions.width);

  //NOTE: saving to SVG requires generating the static XML for the SVG. 
  // Use React's builtin renderToString func to generate the svg string, then uses btoa to encode it to base64
  const createURI = () => {
    const encodedOutput = btoa(renderToString(<ExportGrid canvas={canvas} />));
    return `data:image/svg+xml;base64,${encodedOutput}`;
  };

  return (
    <>
      <div className="toolbar">
        <button
          onClick={() => {
            dispatch(changeToolType("brush"));
          }}
          className={toolType === "brush" ? "active" : undefined}
        >
          Brush
        </button>
        <button
          onClick={() => {
            dispatch(changeToolType("eraser"));
          }}
          className={toolType === "eraser" ? "active" : undefined}
        >
          Eraser
        </button>
        <label>Brush Colour</label>
        <HexColorPicker
          color={toolColour}
          onChange={(colour) => dispatch(changeToolColour(colour))}
        />

        <label htmlFor="height">canvas height</label>
        <input
          id="height"
          type="number"
          value={heightInput}
          onChange={(e) => setHeightInput(parseInt(e.target.value))}
        />

        <label htmlFor="width">canvas width</label>
        <input
          id="width"
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
          Create New Canvas
        </button>
      </div>
      <div className="canvas">
        <PixelGrid />
        <a href={createURI()} download="image.svg">
          Save as SVG
        </a>
      </div>
    </>
  );
}

export default App;
