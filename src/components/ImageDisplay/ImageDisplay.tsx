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
  setRemoveSelected(removeSelected: {
    x: number;
    y: number;
    a: number;
    b: number;
  }): void;
  hidedAreas: { x: number; y: number; a: number; b: number }[];
  setHidedAreas(
    hidedAreas: { x: number; y: number; a: number; b: number }[]
  ): void;
  selectedArea: { x: number; y: number; a: number; b: number };
}

function ImageDisplay({
  setImageUpload,
  uploadedImage,
  setSelectedArea,
  canvasForDraw,
  setRemoveSelected,
  hidedAreas,
  setHidedAreas,
  selectedArea,
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
            setRemoveSelected={setRemoveSelected}
            hidedAreas={hidedAreas}
            setHidedAreas={setHidedAreas}
            selectedArea={selectedArea}
          />
        ) : (
          <h1>Please Upload Image !</h1>
        )}
      </div>
    </div>
  );
}

export default ImageDisplay;
