interface editProps {
  uploadedImage: string;
}

function ImageEdit({ uploadedImage }: editProps) {
  
  return (
    <>
      <img id="uploaded-image" src={uploadedImage} alt="Uploaded" />
    </>
  );
}

export default ImageEdit;
