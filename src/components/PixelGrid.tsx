import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { changePixelValue } from "../app/canvas";
import Pixel from "./Pixel";
import { RootState } from "../app/store";
import "./PixelGrid.css";

const PixelGrid = () => {
  const {
    canvas: {
      dimensions: { height, width, cellSize },
      pixelValues,
    },
    activeTool: { toolColour, toolType },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const handlers = (x: number, y: number, value?: string) => {
    return {
      click() {
        dispatch(
          changePixelValue({
            x,
            y,
            value: toolType === "eraser" ? undefined : value,
          })
        );
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

  const viewWidth = cellSize * width;
  const viewHeight = cellSize * height;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={viewWidth}
      height={viewHeight}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      version="1.1"
      className="grid"
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
            colourVal={value ? value : "transparent"}
            handlers={handlers(x, y, toolColour)}
          />
        );
      })}
    </svg>
  );
};

export const ExportGrid = ({ canvas }: { canvas: RootState["canvas"] }) => {
  const {
    dimensions: { height, width, cellSize },
    pixelValues,
  } = canvas;
  const imgWidth = cellSize * width;
  const imgHeight = cellSize * height;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={imgWidth}
      height={imgHeight}
      viewBox={`0 0 ${imgWidth} ${imgHeight}`}
      version="1.1"
      className="grid"
    >
      {pixelValues.map((value, i) => {
        const y = Math.floor(i / width);
        const x = i % width;
        return value ? (
          <Pixel key={i} pixelSize={cellSize} x={x} y={y} colourVal={value} />
        ) : null;
      })}
    </svg>
  );
};

export default PixelGrid;
