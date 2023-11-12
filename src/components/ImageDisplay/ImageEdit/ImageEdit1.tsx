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
  setRemoveSelected(removeSelected: {
    x: number;
    y: number;
    a: number;
    b: number;
  }): void;
  // removeSelected: { x: number; y: number; a: number; b: number };
  hidedAreas: { x: number; y: number; a: number; b: number }[];
  setHidedAreas(
    hidedAreas: { x: number; y: number; a: number; b: number }[]
  ): void;
  // pointSelected: { x: number; y: number };
  selectedArea: { x: number; y: number; a: number; b: number };
}

function ImageEdit({
  uploadedImage,
  setSelectedArea,
  canvasForDraw,
  setRemoveSelected,
  hidedAreas,
}: // setHidedAreas,
// pointSelected,
// selectedArea,
EditProps) {
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const refCanvas = useRef<HTMLCanvasElement | null>(null);

  const isPointInsideRect = (
    x: number,
    y: number,
    rect: { x: number; y: number; a: number; b: number }
  ) => {
    return (
      x > rect.x &&
      x < rect.x + Math.abs(rect.a) &&
      y > rect.y &&
      y < rect.y + Math.abs(rect.b)
    );
  };

  const handelOnclick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    let selected = null;
    const canvas = refCanvas.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();

      if (hidedAreas.length > 0) {
        selected = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        console.log(selected);
        console.log(hidedAreas);
        for (let i = 0; i < hidedAreas.length; i++) {
          if (isPointInsideRect(selected.x, selected.y, hidedAreas[i])) {
            // console.log("Point inside rect");
            const canvasX = canvasForDraw.current;
            if (!canvasX) {
              return;
            }
            const ctx = canvasX.getContext("2d");
            if (!ctx) {
              return;
            }
            ctx.strokeStyle = "blue";

            ctx.setLineDash([2, 3]);

            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 10;
            ctx.strokeRect(
              hidedAreas[i].x,
              hidedAreas[i].y,
              hidedAreas[i].a,
              hidedAreas[i].b
            );
            setRemoveSelected(hidedAreas[i]);
          }
        }
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = refCanvas.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();

      setIsDrawing(true);
      setStartPoint({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
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
        onClick={(e) => {
          handelOnclick(e);
        }}
      ></canvas>
      <canvas ref={canvasForDraw} id="canvasForDraw"></canvas>
    </>
  );
}

export default ImageEdit;
