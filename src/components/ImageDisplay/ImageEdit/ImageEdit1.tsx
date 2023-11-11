import { useRef, useState } from "react";

interface EditProps {
  uploadedImage: string;
  setSelectedArea(selectedArea: {
    x: number;
    y: number;
    a: number;
    b: number;
  }): void;
  canvasForDraw: React.RefObject<HTMLCanvasElement>;
  setPointSelected(PointSelected: { x: number; y: number }): void;
  hidedAreas: { x: number; y: number; a: number; b: number }[];
  setHidedAreas(
    hidedAreas: { x: number; y: number; a: number; b: number }[]
  ): void;
  pointSelected: { x: number; y: number };
}

function ImageEdit({
  uploadedImage,
  setSelectedArea,
  canvasForDraw,
  setPointSelected,
  hidedAreas,
  setHidedAreas,
  pointSelected,
}: EditProps) {
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  // const [pointSelected, setPointSelected] = useState({ x: 0, y: 0 });

  const isPointInsideRect = (
    x: number,
    y: number,
    rect: { x: number; y: number; a: number; b: number }
  ) => {
    console.log(x > rect.x);
    console.log(x < rect.x + rect.a);
    console.log(y > rect.y);
    console.log(y < rect.y + rect.b);
    return (
      x > rect.x && x < rect.x + rect.a && y > rect.y && y < rect.y + rect.b
      // x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
    );
  };
  // Function to select area
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = refCanvas.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      setPointSelected({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      setIsDrawing(true);
      setStartPoint({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      if (hidedAreas.length > 0) {
        // console.log("hidedAreas", hidedAreas);
        // console.log("pointSelected", pointSelected);
        // console.log("start", startPoint);

        // console.log(
        //   "isPointInsideRect",
        //   isPointInsideRect(pointSelected.x, pointSelected.y, hidedAreas[0])
        // );
        // if (
        //   isPointInsideRect(pointSelected.x, pointSelected.y, hidedAreas[0])
        // ) {
        console.log("Point inside rect");
        const canvasX = canvasForDraw.current;
        if (!canvasX) {
          return;
        }
        const ctx = canvasX.getContext("2d");
        if (!ctx) {
          return;
        }
        ctx.setLineDash([2, 3]);
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 10;
        ctx.strokeRect(
          hidedAreas[0].x,
          hidedAreas[0].y,
          hidedAreas[0].a,
          hidedAreas[0].b
        );
        // }
      }
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = refCanvas.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        setEndPoint({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        // Clear the canvas
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the selected area
        ctx.fillStyle = "rgba(0, 0, 0, 0.233)";
        ctx.fillRect(
          startPoint.x,
          startPoint.y,
          endPoint.x - startPoint.x,
          endPoint.y - startPoint.y
        );
        setSelectedArea({
          x: startPoint.x,
          y: startPoint.y,
          a: endPoint.x - startPoint.x,
          b: endPoint.y - startPoint.y,
        });
        ctx.strokeRect(
          startPoint.x,
          startPoint.y,
          endPoint.x - startPoint.x,
          endPoint.y - startPoint.y
        );
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <img id="uploaded-image" src={uploadedImage} alt="Uploaded" />
      <canvas
        ref={refCanvas}
        id="myCanvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <canvas ref={canvasForDraw} id="canvasForDraw"></canvas>
    </>
  );
}

export default ImageEdit;
