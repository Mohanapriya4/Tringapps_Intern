import { useState } from "react";

function Upl() {
  const [files, setFiles] = useState(null);
  const [msg, setMsg] = useState(null);
  const [fileContents, setFileContents] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (!files) {
      setMsg("No file selected");
      return;
    }

    setMsg("Uploading...");
    displayFileContents();
  };

  const displayFileContents = () => {
    const contents = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        contents.push({ name: file.name, type: file.type, content: event.target.result });
        if (contents.length === files.length) {
          setMsg("Upload successful");
          setFileContents(contents);
        }
      };
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file); // Read images as data URLs
      } else if (file.type === "application/pdf") {
        reader.readAsDataURL(file); // Read PDF files as data URLs
      } else {
        reader.readAsText(file); // Read other files as text
      }
    });
  };

  return (
    <div>
      <h1>Uploading Files in React</h1>
      <input onChange={handleFileChange} type="file" multiple />
      <button onClick={handleUpload}>Upload</button>
      {msg && <span>{msg}</span>}
     
      <div>
        <h2>File Contents:</h2>
        {fileContents.map((file, index) => (
          <div key={index}>
            <h3>{file.name}</h3>
            {file.type.startsWith("image/") ? (
              <img src={file.content} alt={file.name} width="200" />
            ) : file.type === "application/pdf" ? (
              <embed src={file.content} type="application/pdf" width="100%" height="600px" />
            ) : (
              <pre>{file.content}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upl;
