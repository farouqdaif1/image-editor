// import { useState } from "react";

interface buttonsProps {
  selectedArea: {
    x: number;
    y: number;
    a: number;
    b: number;
  };
  canvasForDraw: React.RefObject<HTMLCanvasElement>;
  pointSelected: { x: number; y: number };
  hidedAreas: { x: number; y: number; a: number; b: number }[];
  setHidedAreas(
    hidedAreas: { x: number; y: number; a: number; b: number }[]
  ): void;
}

function ControlButtons({
  selectedArea,
  canvasForDraw,
  hidedAreas,
  setHidedAreas,
}: // pointSelected,
buttonsProps) {
  const handleHide = (
    area: { x: number; y: number; a: number; b: number },
    canvasForDraw: React.RefObject<HTMLCanvasElement>
  ) => {
    const canvasX = canvasForDraw.current;

    if (!canvasX) {
      return;
    }
    if (hidedAreas.length === 0) {
      canvasX.width = canvasX.offsetWidth;
      canvasX.height = canvasX.offsetHeight;
    }
    setHidedAreas([...hidedAreas, area]);
    const ctx = canvasX.getContext("2d");
    if (ctx) {
      // ctx.clearRect(0, 0, canvasX.width, canvasX.height);
      ctx.fillStyle = "#FF0000"; // Red color for the rectangle
      ctx.fillRect(area.x, area.y, area.a, area.b); // Rectangle dimensions (x, y, width, height)
      console.log(canvasX);
    }
  };

  const handleShowSelected = () => {};
  const handleShowAll = () => {
    const canvasX = canvasForDraw.current;

    if (!canvasX) {
      return;
    }
    const context = canvasX.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvasX.width, canvasX.height);
    }
  };

  return (
    <div className="control-buttons">
      <button className="show-selected-block" onClick={handleShowSelected}>
        Show selected block
      </button>
      <button
        className="hide-selected-area"
        onClick={() => {
          handleHide(selectedArea, canvasForDraw);
        }}
      >
        Hide selected Area
      </button>
      <button className="show-all" onClick={handleShowAll}>
        Show All
      </button>
      <button className="download"> Download</button>
    </div>
  );
}

export default ControlButtons;
