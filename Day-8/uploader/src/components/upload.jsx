import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';

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
      reader.onload = async (event) => {
        if (file.type === "application/pdf") {
          const pdfText = await extractTextFromPDF(event.target.result);
          contents.push({ name: file.name, type: file.type, content: pdfText });
        } else {
          contents.push({ name: file.name, type: file.type, content: event.target.result });
        }
        if (contents.length === files.length) {
          setMsg("Upload successful");
          setFileContents(contents);
        }
      };
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file); // Read images as data URLs
      } else if (file.type === "application/pdf") {
        reader.readAsArrayBuffer(file); // Read PDF files as ArrayBuffer
      } else {
        reader.readAsText(file); // Read other files as text
      }
    });
  };

  const extractTextFromPDF = async (arrayBuffer) => {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      textContent.items.forEach((item) => {
        text += item.str + "\n";
      });
    }
    return text;
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
