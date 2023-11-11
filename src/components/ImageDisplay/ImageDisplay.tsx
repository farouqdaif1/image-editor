import { useRef } from "react";
import ImageEdit from "./ImageEdit/ImageEdit1";
interface childProps {
  setImageUpload(imageUrl: string): void;
  uploadedImage: null | string;
  setSelectedArea(selectedArea: {
    x: number;
    y: number;
    a: number;
    b: number;
  }): void;
  canvasForDraw: React.RefObject<HTMLCanvasElement>;
  setPointSelected(PointSelected: { x: number; y: number }): void;
  hidedAreas: { x: number; y: number; a: number; b: number }[];
  setHidedAreas(hidedAreas: { x: number; y: number; a: number; b: number }[]): void;
  pointSelected: { x: number; y: number };
}

function ImageDisplay({
  setImageUpload,
  uploadedImage,
  setSelectedArea,
  canvasForDraw,
  setPointSelected,
  hidedAreas,
  setHidedAreas,
  pointSelected,
  
}: childProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUpload(imageUrl);
    }
  };
  return (
    <div className="preview-image">
      <input
        className="input-file"
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <button
        className="upload-image"
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      >
        Upload Image
      </button>
      <div className="image-editor">
        {uploadedImage ? (
          <ImageEdit
            uploadedImage={uploadedImage}
            setSelectedArea={setSelectedArea}
            canvasForDraw={canvasForDraw}
            setPointSelected={setPointSelected}
            hidedAreas={hidedAreas}
            setHidedAreas={setHidedAreas}
            pointSelected={pointSelected}
          />
        ) : (
          <h1>Please Upload Image !</h1>
        )}
      </div>
    </div>
  );
}

export default ImageDisplay;
