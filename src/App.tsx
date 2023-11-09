function App() {
  return (
    <div className="container">
      <div className="control-buttons">
        <button className="show-selected-block">Show selected block</button>
        <button className="hide-selected-area">Hide selected Area</button>
        <button className="show-all">Show All</button>
        <button className="download"> Download</button>
      </div>
      <div className="preview-image">
        <button className="upload-image">Upload image </button>
        <div className="image-editor">
          <h1>Image Editor</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
