import { Rect } from "react-konva";

const CanvasBackground = ({size}: {size: number}) => {
  return ( 
  <Rect 
    x={-size/2} y={-size/2} 
    width={size} height={size} 
    fill="white" 
  />
)
};

export default CanvasBackground;