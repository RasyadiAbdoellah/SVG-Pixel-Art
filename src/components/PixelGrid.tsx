import { useState } from "react";
import { renderToString } from "react-dom/server";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { changePixelValue } from "../app/canvas";
import Pixel from "./Pixel";

const PixelGrid = () => {
  const {
    canvas: {
      dimensions: { height, width },
      pixelValues,
    },
    activeTool: { toolColour, toolType },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const handlers = (x: number, y: number, value: string) => {
    return {
      click() {
        dispatch(changePixelValue({ x, y, value }));
      },
      mouseDown() {
        setMouseDown(true);
      },
      mouseMove() {
        mouseDown && dispatch(changePixelValue({ x, y, value }));
      },
      mouseUp() {
        setMouseDown(false);
      },
    };
  };

  const cellSize = 50;
  const viewWidth = cellSize * width;
  const viewHeight = cellSize * height;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={viewWidth}
      height={viewHeight}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      version="1.1"
    >
      {pixelValues.map((value, i) => {
        const y = Math.floor(i / width);
        const x = i % width;
        return (
          <Pixel
            key={i}
            pixelSize={cellSize}
            x={x}
            y={y}
            colourVal={value}
            handlers={handlers(x, y, toolColour)}
          />
        );
      })}
    </svg>
  );
};

export default PixelGrid;
