import { useRef } from "react";
import ImageEdit from "./ImageEdit/ImageEdit";
interface childProps {
  setImageUpload(imageUrl: string): void;
  uploadedImage: null | string;
}
function ImageDisplay({ setImageUpload, uploadedImage }: childProps) {
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
      <ImageEdit uploadedImage={uploadedImage} />
    </div>
  );
}

export default ImageDisplay;
