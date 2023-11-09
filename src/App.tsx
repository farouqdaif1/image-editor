import { useState } from "react";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import ImageDisplay from "./components/ImageDisplay/ImageDisplay";

function App() {
  const [uploadedImage, setUploadedImage] = useState<null | string>(null);
  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };
  return (
    <div className="container">
      <ControlButtons />
      <ImageDisplay
        setImageUpload={handleImageUpload}
        uploadedImage={uploadedImage}
      />
    </div>
  );
}

export default App;
