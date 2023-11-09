interface editProps {
  uploadedImage: null | string;
}
function ImageEdit({ uploadedImage }: editProps) {
  return (
    <div className="image-editor">
      {uploadedImage ? (
        <img src={uploadedImage} alt="Uploaded" />
      ) : (
        <h1>Please Upload Image !</h1>
      )}
    </div>
  );
}

export default ImageEdit;
