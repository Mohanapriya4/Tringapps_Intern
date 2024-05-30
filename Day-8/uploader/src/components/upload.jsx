import React, { useState } from 'react';
import { readPDFFile } from './PdfHandler';
import { readImageFile } from './ImageHandler';
import { readExcelFile } from './ExcelHandler';
import { readVideoFile } from './VideoHandler';
import { readAudioFile } from './AudioHandler';
import { readTextFile } from './DocumentHandler';
import './style.css';

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
      setMsg('No file selected');
      return;
    }

    setMsg('Uploading...');
    displayFileContents();
  };

  const displayFileContents = () => {
    const contents = [];
    files.forEach((file) => {
      if (file.type === 'application/pdf') {
        readPDFFile(file, (content) => handleFileRead(content, contents));
      } else if (file.type.startsWith('image/')) {
        readImageFile(file, (content) => handleFileRead(content, contents));
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        readExcelFile(file, (content) => handleFileRead(content, contents));
      } else if (file.type.startsWith('video/')) {
        readVideoFile(file, (content) => handleFileRead(content, contents));
      } else if (file.type.startsWith('audio/')) {
        readAudioFile(file, (content) => handleFileRead(content, contents));
      } else if (file.type === 'text/plain') { 
        readTextFile(file, (content) => handleFileRead(content, contents));
      } else {
        console.log('Unsupported file type:', file.type);
      }
    });
  };

  const handleFileRead = (content, contents) => {
    contents.push(content);
    if (contents.length === files.length) {
      setMsg('Upload successful');
      setFileContents(contents);
    }
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
            {file.type === 'application/pdf' ? (
              <pre>{file.content}</pre>
            ) : file.type.startsWith('image/') ? (
              <img src={file.content} alt={file.name} width="200" />
            ) : file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
              file.content
            ) : file.type === 'text/plain' ? ( 
              <pre>{file.content}</pre>
            ) : file.type.startsWith('video/') ? (
              <video controls width="400">
                <source src={file.content} type={file.type} />
                Your browser does not support the video tag.
              </video>
            ) : file.type.startsWith('audio/') ? (
              <audio controls>
                <source src={file.content} type={file.type} />
                Your browser does not support the audio tag.
              </audio>
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
