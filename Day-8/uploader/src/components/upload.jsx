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
  const [pdfFiles, setPdfFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [excelFiles, setExcelFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);

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
        readPDFFile(file, (content) => handleFileRead(content, contents, setPdfFiles));
      } else if (file.type.startsWith('image/')) {
        readImageFile(file, (content) => handleFileRead(content, contents, setImageFiles));
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        readExcelFile(file, (content) => handleFileRead(content, contents, setExcelFiles));
      } else if (file.type.startsWith('video/')) {
        readVideoFile(file, (content) => handleFileRead(content, contents, setVideoFiles));
      } else if (file.type.startsWith('audio/')) {
        readAudioFile(file, (content) => handleFileRead(content, contents, setAudioFiles));
      } else if (file.type === 'text/plain') { 
        readTextFile(file, (content) => handleFileRead(content, contents, setDocumentFiles));
      } else {
        console.log('Unsupported file type:', file.type);
      }
    });
  };

  const handleFileRead = (content, contents, setFiles) => {
    contents.push(content);
    setFiles((prevFiles) => [...prevFiles, content]);
    if (contents.length === files.length) {
      setMsg('Upload successful');
      setFileContents(contents);
    }
  };

  return (
    <div className="upload-container">
      <h1>Uploading Files in React</h1>
      <input className="file-input" onChange={handleFileChange} type="file" multiple />
      <button className="upload-button" onClick={handleUpload}>Upload</button>
      {msg && <span>{msg}</span>}
      <div className="file-preview-container">
        <div className="file-preview-column">
          <div className="file-preview">
            <h2>PDF Files:</h2>
            {pdfFiles.map((file, index) => (
              <div key={index}>
                <h3>{file.name}</h3>
                <pre>{file.content}</pre>
              </div>
            ))}
          </div>
          <div className="file-preview">
            <h2>Image Files:</h2>
            {imageFiles.map((file, index) => (
              <div key={index}>
                <h3>{file.name}</h3>
                <img src={file.content} alt={file.name} />
              </div>
            ))}
          </div>
        </div>
        <div className="file-preview-column">
          <div className="file-preview">
            <h2>Excel Files:</h2>
            {excelFiles.map((file, index) => (
              <div key={index}>
                <h3>{file.name}</h3>
                {file.content}
              </div>
            ))}
          </div>
          <div className="file-preview">
            <h2>Video Files:</h2>
            {videoFiles.map((file, index) => (
              <div key={index}>
                <h3>{file.name}</h3>
                <video controls>
                  <source src={file.content} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
          <div className="file-preview">
            <h2>Audio Files:</h2>
            {audioFiles.map((file, index) => (
              <div key={index}>
                <h3>{file.name}</h3>
                <audio controls>
                  <source src={file.content} type={file.type} />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            ))}
          </div>
          <div className="file-preview">
            <h2>Document Files:</h2>
            {documentFiles.map((file, index) => (
              <div key={index}>
                <h3>{file.name}</h3>
                <pre>{file.content}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upl;
