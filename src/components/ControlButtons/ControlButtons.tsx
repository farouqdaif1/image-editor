
interface buttonsProps {
  selectedArea: {
    x: number;
    y: number;
    a: number;
    b: number;
  };
  canvasForDraw: React.RefObject<HTMLCanvasElement>;
  removeSelected: { x: number; y: number; a: number; b: number };
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
  removeSelected,
}: buttonsProps) {
  const handleHide = (
    area: { x: number; y: number; a: number; b: number },
    canvasForDraw: React.RefObject<HTMLCanvasElement>
  ) => {
    const baseImage = document.getElementById(
      "uploaded-image"
    ) as HTMLImageElement;
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
      ctx.drawImage(baseImage, 0, 0);

      hidedAreas.forEach(function (element) {
        ctx.fillStyle = "#FF0000"; // Red color for the rectangle
        ctx.fillRect(element.x, element.y, element.a, element.b); // Rectangle dimensions (x, y, width, height)
      });

      ctx.fillStyle = "#FF0000"; // Red color for the rectangle
      ctx.fillRect(area.x, area.y, area.a, area.b); // Rectangle dimensions (x, y, width, height)
    }
  };

  const handleShowSelected = () => {
    const baseImage = document.getElementById(
      "uploaded-image"
    ) as HTMLImageElement;
    const canvasX = canvasForDraw.current;
    if (!canvasX) {
      return;
    }
    const ctx = canvasX.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvasX.width, canvasX.height); // Clear the canvas
    ctx.drawImage(baseImage, 0, 0);

    const clearArray = hidedAreas.filter((area) => area !== removeSelected);
    setHidedAreas(clearArray);
    hidedAreas.forEach(function (element) {
      // Check if the current element is not the excluded element
      if (element !== removeSelected) {
        // Perform your function on the element
        ctx.fillStyle = "#FF0000"; // Red color for the rectangle
        ctx.fillRect(element.x, element.y, element.a, element.b); // Rectangle dimensions (x, y, width, height)
      }
    });
  };
  const handleShowAll = () => {
    const baseImage = document.getElementById(
      "uploaded-image"
    ) as HTMLImageElement;
    const canvasX = canvasForDraw.current;

    if (!canvasX) {
      return;
    }
    const context = canvasX.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvasX.width, canvasX.height);
      console.log("baseImage", baseImage);
      setHidedAreas([]);
      context.drawImage(baseImage, 0, 0);
    }
  };
  const handleDownload = () => {
    console.log("Download");
    const canvasX = canvasForDraw.current;
    if (!canvasX) {
      return;
    }
    const ctx = canvasX.getContext("2d");
    if (!ctx) {
      return;
    }

    const image = canvasX
      .toDataURL("image/png", 1.0)
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = image;
    link.click();
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
      <button className="download" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}
export default ControlButtons;
