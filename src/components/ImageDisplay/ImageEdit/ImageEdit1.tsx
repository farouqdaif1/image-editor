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
}

function ImageEdit({
  uploadedImage,
  setSelectedArea,
  canvasForDraw,
}: EditProps) {
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const refCanvas = useRef<HTMLCanvasElement | null>(null);


  // Function to select area
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
      <canvas
        ref={canvasForDraw}
        id="canvasForDraw"
      ></canvas>
    </>
  );
}

export default ImageEdit;
