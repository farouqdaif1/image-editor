import { useRef, useState } from "react";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import ImageDisplay from "./components/ImageDisplay/ImageDisplay";

function App() {
  const [uploadedImage, setUploadedImage] = useState<null | string>(null);
  const [selectedArea, setSelectedArea] = useState<{
    x: number;
    y: number;
    a: number;
    b: number;
  }>({
    x: 0,
    y: 0,
    a: 0,
    b: 0,
  });
  const canvasForDraw = useRef<HTMLCanvasElement | null>(null);
  const [pointSelected, setPointSelected] = useState({ x: 0, y: 0 });
  const [hidedAreas, setHidedAreas] = useState<
    { x: number; y: number; a: number; b: number }[]
  >([]); // array of areas that are hided
  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };
  return (
    <div className="container">
      <ControlButtons
        canvasForDraw={canvasForDraw}
        selectedArea={selectedArea}
        pointSelected={pointSelected}
        hidedAreas={hidedAreas}
        setHidedAreas={setHidedAreas}
      />
      <ImageDisplay
        setImageUpload={handleImageUpload}
        uploadedImage={uploadedImage}
        setSelectedArea={setSelectedArea}
        canvasForDraw={canvasForDraw}
        setPointSelected={setPointSelected}
        hidedAreas={hidedAreas}
        setHidedAreas={setHidedAreas}
        pointSelected={pointSelected}
        selectedArea= {selectedArea}
        
      />
    </div>
  );
}

export default App;
