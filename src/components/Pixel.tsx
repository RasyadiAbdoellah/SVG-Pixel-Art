import { MouseEventHandler } from "react";

type Props = {
  pixelSize: number;
  x: number;
  y: number;
  colourVal: string;
  handlers : {
    [key: string]: MouseEventHandler
  }
}

const Pixel = ({ pixelSize, x, y, colourVal, handlers }: Props) => {

  const xPos = x * pixelSize
  const yPos = y * pixelSize

  return (
    <rect
          width={pixelSize}
          height={pixelSize}
          x={xPos}
          y={yPos}
            stroke="grey"
          fill={colourVal}
            onClick={handlers.click}
            onMouseDown={handlers.mouseDown}
            onMouseMove={handlers.mouseMove}
            onMouseUp={handlers.mouseUp}
          />
  )
}

export default Pixel