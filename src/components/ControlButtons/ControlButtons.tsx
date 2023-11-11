interface buttonsProps {
  selectedArea: {
    x: number;
    y: number;
    a: number;
    b: number;
  };
  canvasForDraw: React.RefObject<HTMLCanvasElement>;
}

function ControlButtons({ selectedArea, canvasForDraw }: buttonsProps) {
  const handleHide = (
    area: { x: number; y: number; a: number; b: number },
    canvasForDraw: React.RefObject<HTMLCanvasElement>
  ) => {
    const canvasX = canvasForDraw.current;

    if (!canvasX) {
      return;
    }
    canvasX.width = canvasX.offsetWidth;
    canvasX.height = canvasX.offsetHeight;
    const ctx = canvasX.getContext("2d");
    if (ctx) {
      // ctx.clearRect(0, 0, canvasX.width, canvasX.height);
      ctx.fillStyle = "#FF0000"; // Red color for the rectangle
      ctx.fillRect(area.x, area.y, area.a, area.b); // Rectangle dimensions (x, y, width, height)
      console.log(canvasX);
    }
  };

  return (
    <div className="control-buttons">
      <button className="show-selected-block">Show selected block</button>
      <button
        className="hide-selected-area"
        onClick={() => {
          handleHide(selectedArea, canvasForDraw);
        }}
      >
        Hide selected Area
      </button>
      <button className="show-all">Show All</button>
      <button className="download"> Download</button>
    </div>
  );
}

export default ControlButtons;
